// ===== gameState.js =====

export const GameStates = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  IN_HOUSE: 'in-house',
  INVENTORY: 'inventory',
};

export let currentState = GameStates.MENU;

export function setGameState(state) {
  currentState = state;
  console.log(`Game state changed to: ${state}`);
}

export function isPlaying() {
  return currentState === GameStates.PLAYING;
}

export function isPaused() {
  return currentState === GameStates.PAUSED || currentState === GameStates.IN_HOUSE || currentState === GameStates.INVENTORY;
}
