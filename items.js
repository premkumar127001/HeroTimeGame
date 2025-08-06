export const items = {
  torch: {
    name: 'Torch',
    image: './Assets/torch.png'
  },
  timeMachine: {
    name: 'Time Machine',
    image: './Assets/time-machine.png'
  },
  timeBomb: {
    name: 'Time Bomb',
    image: './Assets/time-bomb.png'
  },
  axe:{
    name: 'Axe',
    image: './Assets/axe.png'
  },
  crown:{
    name: 'Crown',
    image: './Assets/crown.png'
  },
  key:{
    name: 'Key',
    image: './Assets/key.png'
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


