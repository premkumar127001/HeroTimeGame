import { items } from './items.js';

export async function loadPlayerInventory() {
  // Simulated fetch for now; replace with real API later
//   const response = await fetch('/api/inventory');
//   const data = await response.json(); 
  // expects: [{ key: 'torch', quantity: 2 }, ...]

  const container = document.getElementById('global-inventory-ui');
  const grid = document.getElementById('global-inventory-grid');
  container.classList.remove('hidden');
  grid.innerHTML = '';

  data.forEach(({ key, quantity }) => {
    const item = items[key];
    if (!item) return;

    const div = document.createElement('div');
    div.classList.add('item-cell');

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.width = 128;
    img.height = 128;

    const label = document.createElement('p');
    label.textContent = item.name;

    const qty = document.createElement('p');
    qty.textContent = `x${quantity}`;

    div.appendChild(img);
    div.appendChild(label);
    div.appendChild(qty);
    grid.appendChild(div);
  });
}

// === Global keybind to open/close inventory ===
window.addEventListener('keydown', async e => {
  if (e.key === 'i' && !window.uiOpen) {
    // alert("Btn I pressed");
    await loadPlayerInventory();
    window.uiOpen = true;
  } else if (e.key === 'Escape' && window.uiOpen) {
    document.getElementById('global-inventory-ui').style.display = "none";
    window.uiOpen = false;
  }
});