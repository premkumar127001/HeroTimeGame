export const tileTypes = {
    0: { name: 'water', walkable: false },
    5: { name: 'grass', walkable: true },
    7: { name: 'brick', walkable: false },
    10: { name: 'bridge', walkable: true },
    21: { name: 'house', walkable: true },
};

// Helper: check if tile is walkable
export function isWalkable(tileIndex) {
    return tileTypes[tileIndex]?.walkable === true;
}
