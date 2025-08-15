// ===== inputManager.js =====
import { GameStates, currentState, setGameState } from './gameState.js';
import { closeHouseUI } from './houseUI.js';
import { openMainMenu, closeMainMenu } from './menuApi.js';
// Optional: bring these if/when you have them
// import { openGlobalInventory, closeGlobalInventory } from './globalInventory.js';

let escLatch = false;

// Esc = back/close current layer (centralized)
window.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;

  // Ignore Escape until game has actually started
  if (currentState === GameStates.MENU) return;

  if (escLatch) return;
  escLatch = true;

  switch (currentState) {
    case GameStates.IN_HOUSE:
      // close house, resume game
      if (window.playerRef) closeHouseUI(window.playerRef);
      setGameState(GameStates.PLAYING);
      break;

    case GameStates.PAUSED: // main menu shown
      closeMainMenu();
      // setGameState(GameStates.PLAYING); // set by closeMainMenu
      break;

    case GameStates.PLAYING:
      openMainMenu();
      // setGameState(GameStates.PAUSED); // set by openMainMenu
      break;

    default:
      // ignore in other states
      break;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') escLatch = false;
});

// Optional: global hotkeys while playing (I for inventory, E for interact)
// window.addEventListener('keydown', (e) => {
//   if (currentState !== GameStates.PLAYING) return;
//   if (e.key.toLowerCase() === 'i') {
//     openGlobalInventory();
//     setGameState(GameStates.INVENTORY);
//   }
//   if (e.key.toLowerCase() === 'e') {
//     // you can expose a callback from game.js to interact with tiles
//     window.gameInteract?.();
//   }
// });
