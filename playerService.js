// ===== playerService.js =====

export async function loadPlayerData() {
  try {
    const res = await fetch('/api/player');
    if (!res.ok) throw new Error('Failed to load player data');
    return await res.json();
  } catch (err) {
    console.error('Load Error:', err);
    return null; // fallback to default if needed
  }
}

export async function savePlayerData(player) {
  try {
    const res = await fetch('/api/player', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player)
    });
    const data = await res.json();
    console.log('✅ Player saved:', data);
  } catch (err) {
    console.error('Save Error:', err);
  }
}
