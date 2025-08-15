import express from 'express';
import fs from 'fs';
const app = express();
app.use(express.json());

const PLAYER_FILE = './server/player.json';

// === GET player data ===
app.get('/api/player', (req, res) => {
  if (!fs.existsSync(PLAYER_FILE)) return res.json(null);
  const data = fs.readFileSync(PLAYER_FILE, 'utf-8');
  res.json(JSON.parse(data));
});

// === POST player data ===
app.post('/api/player', (req, res) => {
  fs.writeFileSync(PLAYER_FILE, JSON.stringify(req.body, null, 2));
  res.json({ status: 'saved', player: req.body });
});
