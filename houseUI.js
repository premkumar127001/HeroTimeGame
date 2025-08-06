// ===== houseUI.js =====
import { items, getRandomItems } from './items.js';

export const inventory = [];
let selectedKeys = []; // active set of item keys
let selectedIndex = 0;

export function showHouseUI(tile, player) {
  if (!tile.getItems) return;
  const totalAvailable = Object.keys(items).length;
  const count = Math.floor(Math.random() * totalAvailable) + 1; // random 1 to total
  selectedKeys = getRandomItems(count);
  selectedIndex = 0;

  const container = document.getElementById('tile-ui');
  container.style.display = "flex";
  container.style.flexDirection = "row";
  player.uiOpen = true;

  renderUI();
  pauseGame();
}

export function closeHouseUI(player) {
  document.getElementById('tile-ui').style.display = "none";
  document.getElementById('tile-ui').style.flexDirection = "";
  player.uiOpen = false;
  resumeGame();
}

function renderUI() {
  console.log('Selected Keys:', selectedKeys);

  const itemGrid = document.getElementById('item-grid');
  const bagGrid = document.getElementById('bag-grid');

  itemGrid.innerHTML = '';
  bagGrid.innerHTML = '';

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

  // Inventory as map { key -> { item, quantity } }
  const inventoryMap = {};
  inventory.forEach(item => {
    const key = Object.keys(items).find(k => items[k] === item);
    if (key) {
      if (!inventoryMap[key]) {
        inventoryMap[key] = { item, quantity: 0 };
      }
      inventoryMap[key].quantity++;
    }
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
    qtyRow.style.padding = '10px 0px';
    

    const qty = document.createElement('span');
    qty.textContent = `${quantity}`;
    qty.style.paddingLeft = '10px';

    const removeIcon = document.createElement('i');
    removeIcon.className = 'fa-solid fa-xmark';
    removeIcon.style.cursor = 'pointer';
    removeIcon.style.paddingRight = '10px';
    removeIcon.onclick = () => {
      // Remove one quantity
      const index = inventory.findIndex(i => i === item);
      if (index !== -1) {
        inventory.splice(index, 1);
        selectedKeys.push(key);
        renderUI();
      }
    };

    qtyRow.appendChild(qty);
    qtyRow.appendChild(removeIcon);

    div.appendChild(img);
    div.appendChild(label);
    div.appendChild(qtyRow);
    bagGrid.appendChild(div);
  });
}

function pauseGame() {
  window.gamePaused = true;
}

function resumeGame() {
  window.gamePaused = false;
}

// Handle arrow key and Enter selection
window.addEventListener('keydown', e => {
  if (!window.gamePaused) return;

  // Always allow Escape
  if (e.key === 'Escape') {
    const player = window.playerRef;
    if (player) closeHouseUI(player);
    return;
  }

  // Skip movement if no items
  if (selectedKeys.length === 0) return;

  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    selectedIndex = (selectedIndex + 1) % selectedKeys.length;
    renderUI();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    selectedIndex = (selectedIndex - 1 + selectedKeys.length) % selectedKeys.length;
    renderUI();
  } else if (e.key === 'Enter') {
    const selected = selectedKeys.splice(selectedIndex, 1);
    if (selected.length > 0) inventory.push(items[selected[0]]);
    selectedIndex = 0;
    renderUI();
  } else if (e.key === 'Escape') {
    const player = window.playerRef;
    if (player) closeHouseUI(player);
  }
});
