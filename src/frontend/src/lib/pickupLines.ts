export interface PickupLine {
  text: string;
  day?: string;
}

export const PICKUP_LINES: PickupLine[] = [
  // Rose Day
  { text: "Are you a rose? Because you're blooming beautiful!", day: 'Rose Day' },
  { text: "If I had a rose for every time I thought of you, I'd be walking through my garden forever.", day: 'Rose Day' },
  { text: "Roses are red, violets are blue, but nothing compares to the beauty of you.", day: 'Rose Day' },
  
  // Propose Day
  { text: "I must be a snowflake, because I've fallen for you.", day: 'Propose Day' },
  { text: "Do you have a map? I keep getting lost in your eyes.", day: 'Propose Day' },
  { text: "If loving you is wrong, I don't want to be right.", day: 'Propose Day' },
  
  // Chocolate Day
  { text: "You're sweeter than any chocolate I've ever tasted.", day: 'Chocolate Day' },
  { text: "Are you made of chocolate? Because you're melting my heart.", day: 'Chocolate Day' },
  { text: "Life without you would be like a box of chocolates without the caramel.", day: 'Chocolate Day' },
  
  // Teddy Day
  { text: "I'd give you a teddy bear, but you're already cuddly enough.", day: 'Teddy Day' },
  { text: "Are you a teddy bear? Because I want to hug you all day long.", day: 'Teddy Day' },
  { text: "You're more huggable than any teddy bear in the world.", day: 'Teddy Day' },
  
  // Promise Day
  { text: "I promise to always make you smile, even on your worst days.", day: 'Promise Day' },
  { text: "Can I promise you forever? Because that's how long I want to be with you.", day: 'Promise Day' },
  { text: "I promise to love you more with each passing day.", day: 'Promise Day' },
  
  // Hug Day
  { text: "Can I borrow a hug? I promise I'll give it back with interest.", day: 'Hug Day' },
  { text: "Your hugs are my favorite place to be.", day: 'Hug Day' },
  { text: "I'd travel a thousand miles just for one of your hugs.", day: 'Hug Day' },
  
  // Kiss Day
  { text: "Do you have a Band-Aid? Because I just scraped my knee falling for you.", day: 'Kiss Day' },
  { text: "Is your name Google? Because you have everything I've been searching for.", day: 'Kiss Day' },
  { text: "Can I follow you home? Because my parents always told me to follow my dreams.", day: 'Kiss Day' },
  
  // General
  { text: "Are you a magician? Because whenever I look at you, everyone else disappears." },
  { text: "Do you believe in love at first sight, or should I walk by again?" },
  { text: "If beauty were time, you'd be an eternity." },
  { text: "Are you a camera? Because every time I look at you, I smile." },
  { text: "Is your dad an artist? Because you're a masterpiece." },
];

let lastPickupLineIndex = -1;

export function getRandomPickupLine(preferredDay?: string): PickupLine {
  // Filter by day if provided
  let availableLines = preferredDay
    ? PICKUP_LINES.filter((line) => !line.day || line.day === preferredDay)
    : PICKUP_LINES;

  // Fallback to all lines if no matches
  if (availableLines.length === 0) {
    availableLines = PICKUP_LINES;
  }

  // Simple de-duplication: avoid showing the same line twice in a row
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * availableLines.length);
  } while (randomIndex === lastPickupLineIndex && availableLines.length > 1);

  lastPickupLineIndex = randomIndex;
  return availableLines[randomIndex];
}
