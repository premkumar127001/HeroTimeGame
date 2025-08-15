// ===== menuApi.js =====
import { GameStates, setGameState } from './gameState.js';

let menuOpen = false;

// lazy lookup (safe if scripts load before DOM or after)
function el() {
  return document.getElementById('mainMenuContainer');
}

export function openMainMenu() {
  if (menuOpen) return;
  menuOpen = true;
  const menu = el();
  if (menu) menu.style.display = 'flex';
  setGameState(GameStates.PAUSED);
  // console.log('[menu] open');
}

export function closeMainMenu() {
  if (!menuOpen) return;
  menuOpen = false;
  const menu = el();
  if (menu) menu.style.display = 'none';
  setGameState(GameStates.PLAYING);
  // console.log('[menu] close');
}

export function toggleMainMenu() {
  if (menuOpen) closeMainMenu();
  else openMainMenu();
}
