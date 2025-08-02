// ===== houseUI.js =====
import { items } from './items.js';

export const inventory = [];
let selectedKeys = []; // active set of item keys
let selectedIndex = 0;

export function showHouseUI(tile, player) {
  if (!tile.getItems) return;
  selectedKeys = tile.getItems();
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

  inventory.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('item-cell');

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.width = 128;
    img.height = 128;

    const label = document.createElement('p');
    label.textContent = item.name;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      const key = Object.keys(items).find(k => items[k] === item);
      if (key) selectedKeys.push(key);
      inventory.splice(index, 1);
      renderUI();
    };

    div.appendChild(img);
    div.appendChild(label);
    div.appendChild(removeBtn);
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
  if (!window.gamePaused || selectedKeys.length === 0) return;

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
  }else if (e.key === 'Escape') {
    const player = window.playerRef;
    if (player) closeHouseUI(player);
  }
});
