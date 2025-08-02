import { tileTypes, isWalkable } from './tileTypes.js';
import { showHouseUI } from './houseUI.js';


export default class Player {
  constructor(x, y, tileSize, color = 'red', speed = 1) {
    this.x = x;
    this.y = y;
    this.width = tileSize;
    this.height = tileSize;
    this.color = color;
    this.speed = speed;
    this.targetX = x;
    this.targetY = y;
    this.moving = false;
    this.lastTileIndex = null;
  }

  update(keys, mapWidth, mapHeight, tileMap) {
    const nextX = this.x;
    const nextY = this.y;
    let intendedX = this.x;
    let intendedY = this.y;

    if (!this.moving) {
      if (keys.ArrowUp && this.y - this.height >= 0) {
        intendedY = this.y - this.height;
      } else if (keys.ArrowDown && this.y + this.height < mapHeight) {
        intendedY = this.y + this.height;
      } else if (keys.ArrowLeft && this.x - this.width >= 0) {
        intendedX = this.x - this.width;
      } else if (keys.ArrowRight && this.x + this.width < mapWidth) {
        intendedX = this.x + this.width;
      }

      const tileX = Math.floor(intendedX / this.width);
      const tileY = Math.floor(intendedY / this.height);
      const tileIndex = tileMap[tileY]?.[tileX];

      if (isWalkable(tileIndex)) {
        this.targetX = intendedX;
        this.targetY = intendedY;
        this.moving = true;
      }
    }

    if (this.moving) {
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;

      if (Math.abs(dx) > 0) this.x += this.speed * Math.sign(dx);
      if (Math.abs(dy) > 0) this.y += this.speed * Math.sign(dy);

      if (Math.abs(dx) <= this.speed && Math.abs(dy) <= this.speed) {
        this.x = this.targetX;
        this.y = this.targetY;
        this.moving = false;
      }
      const tileX = Math.floor(this.x / this.width);
      const tileY = Math.floor(this.y / this.height);
      const tileIndex = tileMap[tileY]?.[tileX];

      if (tileIndex !== this.lastTileIndex) {
        const tile = tileTypes[tileIndex];

        if (tile?.interactive && !this.uiOpen) {
          console.log(`Entered ${tile.name} (index ${tileIndex})`);
          showHouseUI(tile, this);
        }

        this.lastTileIndex = tileIndex;
      }

    }
  }

  draw(ctx, cameraX, cameraY) {
    const screenX = this.x - cameraX;
    const screenY = this.y - cameraY;
    ctx.fillStyle = this.color;
    ctx.fillRect(screenX, screenY, this.width, this.height);
  }
}