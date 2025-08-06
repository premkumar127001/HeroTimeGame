import Player from './player.js';
import { closeHouseUI, showHouseUI } from './houseUI.js';
window.closeTileUI = () => closeHouseUI(player);


let scaleFactor = 2; // 2x zoom (you can try 1.5, 2.5, etc.)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.screen.width;
canvas.height = window.screen.height;

let tileSize = 16;
let mapCols, mapRows;
let tileMapLayers = [];
const tilesetColumns = 6;

const player = new Player(80, 96, tileSize);
window.playerRef = player;
let cameraX = 0;
let cameraY = 0;
const keys = {};

window.addEventListener('keydown', e => (keys[e.key] = true));
window.addEventListener('keyup', e => (keys[e.key] = false));

const tileset = new Image();
function decodeLayer(layer, width, height) {
  const binary = atob(layer.data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  const decompressed = pako.inflate(bytes);
  const tileIDs = new Uint32Array(decompressed.buffer);

  const result = [];
  for (let y = 0; y < height; y++) {
    result[y] = [];
    for (let x = 0; x < width; x++) {
      result[y][x] = tileIDs[y * width + x] - 1;
    }
  }
  return result;
}

fetch('Assets/newMap.tmj')
  .then(res => res.json())
  .then(mapData => {
    mapCols = mapData.width;
    mapRows = mapData.height;
    tileSize = mapData.tilewidth;

    tileMapLayers = mapData.layers.map(layer => decodeLayer(layer, mapCols, mapRows));

    const tilesetPath = mapData.tilesets[0].image.replace(/^.*[\\/]/, '');
    tileset.src = 'Assets/' + tilesetPath;

    tileset.onload = () => {
      requestAnimationFrame(gameLoop);
    };
  });

function update() {
  const mapWidth = tileMapLayers[0][0].length * tileSize;
  const mapHeight = tileMapLayers[0].length * tileSize;
  player.update(keys, mapWidth, mapHeight, tileMapLayers[0]);


  cameraX = player.x + player.width / 2 - (canvas.width / scaleFactor) / 2;
  cameraY = player.y + player.height / 2 - (canvas.height / scaleFactor) / 2;


  const maxCamX = mapWidth - canvas.width / scaleFactor;
  const maxCamY = mapHeight - canvas.height / scaleFactor;

  cameraX = Math.max(0, Math.min(cameraX, maxCamX));
  cameraY = Math.max(0, Math.min(cameraY, maxCamY));
}

function drawTilemap() {
  const startCol = Math.floor(cameraX / tileSize);
  const startRow = Math.floor(cameraY / tileSize);
  const viewCols = Math.ceil(canvas.width / tileSize);
  const viewRows = Math.ceil(canvas.height / tileSize);

  for (let layer = 0; layer < tileMapLayers.length; layer++) {
    const tileMap = tileMapLayers[layer];

    for (let y = 0; y <= viewRows; y++) {
      for (let x = 0; x <= viewCols; x++) {
        const mapX = startCol + x;
        const mapY = startRow + y;

        if (
          tileMap[mapY] &&
          tileMap[mapY][mapX] !== undefined &&
          tileMap[mapY][mapX] >= 0
        ) {
          const tileIndex = tileMap[mapY][mapX];
          const sx = (tileIndex % tilesetColumns) * tileSize;
          const sy = Math.floor(tileIndex / tilesetColumns) * tileSize;
          const dx = x * tileSize - (cameraX % tileSize);
          const dy = y * tileSize - (cameraY % tileSize);

          ctx.drawImage(tileset, sx, sy, tileSize, tileSize, dx, dy, tileSize, tileSize);
        }
      }
    }
  }
}

function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update();
  ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0); // Apply zoom
  ctx.clearRect(0, 0, canvas.width / scaleFactor, canvas.height / scaleFactor);
  drawTilemap();
  player.draw(ctx, cameraX, cameraY);


  requestAnimationFrame(gameLoop);
}

let lastTime = 0;
