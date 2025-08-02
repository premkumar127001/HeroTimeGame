window.tileTypes = {
  0: { name: 'water', walkable: false },
  5: { name: 'grass', walkable: true },
  7: { name: 'brick', walkable: false },
  10: { name: 'bridge', walkable: true },
  21: { name: 'house', walkable: true }
};

window.isWalkable = function(tileIndex) {
  return window.tileTypes[tileIndex]?.walkable === true;
};
