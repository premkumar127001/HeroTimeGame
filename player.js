class Player {
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
  }

  update(keys, mapWidth, mapHeight) {
    if (!this.moving) {
      if (keys.ArrowUp && this.y - this.height >= 0) {
        this.targetY = this.y - this.height;
        this.moving = true;
      } else if (keys.ArrowDown && this.y + this.height < mapHeight) {
        this.targetY = this.y + this.height;
        this.moving = true;
      } else if (keys.ArrowLeft && this.x - this.width >= 0) {
        this.targetX = this.x - this.width;
        this.moving = true;
      } else if (keys.ArrowRight && this.x + this.width < mapWidth) {
        this.targetX = this.x + this.width;
        this.moving = true;
      }
    }

    // Move towards target
    if (this.moving) {
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;

      if (Math.abs(dx) > 0) this.x += this.speed * Math.sign(dx);
      if (Math.abs(dy) > 0) this.y += this.speed * Math.sign(dy);

      // Snap when close
      if (Math.abs(dx) <= this.speed && Math.abs(dy) <= this.speed) {
        this.x = this.targetX;
        this.y = this.targetY;
        this.moving = false;
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