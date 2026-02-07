export interface ValentineDay {
  index: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

export const VALENTINE_DAYS: ValentineDay[] = [
  {
    index: 1,
    name: 'Rose Day',
    description: 'Express your love with roses',
    emoji: '🌹',
    color: 'rose',
  },
  {
    index: 2,
    name: 'Propose Day',
    description: 'Take the next step in your relationship',
    emoji: '💍',
    color: 'pink',
  },
  {
    index: 3,
    name: 'Chocolate Day',
    description: 'Share sweet treats with your loved one',
    emoji: '🍫',
    color: 'amber',
  },
  {
    index: 4,
    name: 'Teddy Day',
    description: 'Gift a cute teddy bear to someone special',
    emoji: '🧸',
    color: 'orange',
  },
  {
    index: 5,
    name: 'Promise Day',
    description: 'Make meaningful promises to each other',
    emoji: '🤝',
    color: 'purple',
  },
  {
    index: 6,
    name: 'Hug Day',
    description: 'Share warm hugs with those you care about',
    emoji: '🤗',
    color: 'blue',
  },
  {
    index: 7,
    name: 'Kiss Day',
    description: 'Seal your love with a kiss',
    emoji: '💋',
    color: 'red',
  },
];

export function getDayByName(name: string): ValentineDay | undefined {
  return VALENTINE_DAYS.find((day) => day.name === name);
}

export function getDayByIndex(index: number): ValentineDay | undefined {
  return VALENTINE_DAYS.find((day) => day.index === index);
}
