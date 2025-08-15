// ===== houseUI.js =====
import { items, getRandomItems } from './items.js';

export const inventory = [];       // local bag representation (right panel)
let selectedKeys = [];             // loot keys on the left
let selectedIndex = 0;
let isOpen = false;                // gate input while UI is closed

// Public API — called by gameplay when entering a house
export function showHouseUI(tile, player) {
  if (!tile?.getItems) return;

  const totalAvailable = Object.keys(items).length;
  const count = Math.floor(Math.random() * totalAvailable) + 1; // 1..N
  selectedKeys = getRandomItems(count);
  selectedIndex = 0;

  const container = document.getElementById('tile-ui');
  container.style.display = 'flex';
  container.style.flexDirection = 'row';

  player.uiOpen = true;
  isOpen = true;

  renderUI();
}

// Public API — called by central input manager (Esc) or game flow
export function closeHouseUI(player) {
  const container = document.getElementById('tile-ui');
  container.style.display = 'none';
  container.style.flexDirection = '';

  player.uiOpen = false;
  isOpen = false;
}

// ----------------- Internal rendering -----------------
function renderUI() {
  const itemGrid = document.getElementById('item-grid');
  const bagGrid = document.getElementById('bag-grid');

  itemGrid.innerHTML = '';
  bagGrid.innerHTML = '';

  // Left: loot list (selectedKeys)
  selectedKeys.forEach((key, index) => {
    const item = items[key];
    const div = document.createElement('div');
    div.classList.add('item-cell');
    if (index === selectedIndex) div.classList.add('selected');

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.width = 128;
    img.height = 128;

    const label = document.createElement('p');
    label.textContent = item.name;

    div.appendChild(img);
    div.appendChild(label);
    itemGrid.appendChild(div);
  });

  // Right: inventory collapsed by quantity
  const inventoryMap = {};
  inventory.forEach(it => {
    const key = Object.keys(items).find(k => items[k] === it);
    if (!key) return;
    if (!inventoryMap[key]) inventoryMap[key] = { item: it, quantity: 0 };
    inventoryMap[key].quantity++;
  });

  Object.entries(inventoryMap).forEach(([key, entry]) => {
    const { item, quantity } = entry;

    const div = document.createElement('div');
    div.classList.add('item-cell');

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.width = 128;
    img.height = 128;

    const label = document.createElement('p');
    label.textContent = item.name;

    const qtyRow = document.createElement('div');
    qtyRow.style.display = 'flex';
    qtyRow.style.justifyContent = 'space-between';
    qtyRow.style.alignItems = 'center';
    qtyRow.style.width = '100%';
    qtyRow.style.backgroundColor = 'white';
    qtyRow.style.padding = '10px 0';

    const qty = document.createElement('span');
    qty.textContent = `${quantity}`;
    qty.style.paddingLeft = '10px';

    const removeIcon = document.createElement('i');
    removeIcon.className = 'fa-solid fa-xmark';
    removeIcon.style.cursor = 'pointer';
    removeIcon.style.paddingRight = '10px';
    removeIcon.onclick = () => {
      // Remove a single quantity locally and return it to the left list
      const idx = inventory.findIndex(i => i === item);
      if (idx !== -1) {
        inventory.splice(idx, 1);
        selectedKeys.push(key);
        renderUI();
      }
      // If you have a server, also call removeItem(key) here.
    };

    qtyRow.appendChild(qty);
    qtyRow.appendChild(removeIcon);

    div.appendChild(img);
    div.appendChild(label);
    div.appendChild(qtyRow);
    bagGrid.appendChild(div);
  });
}

// ----------------- Keyboard for selection ONLY -----------------
window.addEventListener('keydown', e => {
  if (!isOpen) return;                   // only when house UI is open
  if (selectedKeys.length === 0) return; // nothing left to pick

  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    selectedIndex = (selectedIndex + 1) % selectedKeys.length;
    renderUI();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    selectedIndex = (selectedIndex - 1 + selectedKeys.length) % selectedKeys.length;
    renderUI();
  } else if (e.key === 'Enter') {
    const selected = selectedKeys.splice(selectedIndex, 1);
    if (selected.length > 0) {
      const key = selected[0];
      inventory.push(items[key]);        // local bag
      // If you have a server, also call addItem(key) here.
    }
    selectedIndex = 0;
    renderUI();
  }
});
