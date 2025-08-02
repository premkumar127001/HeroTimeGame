export const items = {
  torch: {
    name: 'Torch',
    image: './Assets/torch.png'
  },
  map: {
    name: 'Treasure Map',
    image: './Assets/torch.png'
  },
  potion: {
    name: 'Potion',
    image: './Assets/torch.png'
  },
  map: {
    name: 'Treasure Map',
    image: './Assets/torch.png'
  },
  wood: {
    name: 'Wood',
    image: './Assets/torch.png'
  },
  pipe: {
    name: 'Pipe',
    image: './Assets/torch.png'
  },
  food: {
    name: 'Food',
    image: './Assets/torch.png'
  }
};


// Optional helper
export function getRandomItems(count=2) {
  const keys = Object.keys(items);
  const result = [];
  while (result.length < count) {
    const rand = keys[Math.floor(Math.random() * keys.length)];
    if (!result.includes(rand)) result.push(rand);
  }
  return result;
}

