export const items = {
  torch: {
    name: 'Torch',
    image: './Assets/Items/torch.png'
  },
  timeMachine: {
    name: 'Time Machine',
    image: './Assets/Items/time-machine.png'
  },
  timeBomb: {
    name: 'Time Bomb',
    image: './Assets/Items/time-bomb.png'
  },
  axe:{
    name: 'Axe',
    image: './Assets/Items/axe.png'
  },
  crown:{
    name: 'Crown',
    image: './Assets/Items/crown.png'
  },
  key:{
    name: 'Key',
    image: './Assets/Items/key.png'
  }
};


// Optional helper
export function getRandomItems(count = 1) {
  const keys = Object.keys(items);
  const max = Math.min(count, keys.length);  // avoid overflow
  const result = [];

  while (result.length < max) {
    const rand = keys[Math.floor(Math.random() * keys.length)];
    if (!result.includes(rand)) result.push(rand);
  }
  return result;
}


