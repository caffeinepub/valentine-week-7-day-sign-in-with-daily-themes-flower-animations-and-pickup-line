import { useState } from 'react';
import PickupLineOverlay from './PickupLineOverlay';
import { getRandomPickupLine } from '../../lib/pickupLines';
import './flowerField.css';

interface FlowerFieldProps {
  dayName: string;
}

// Map day names to their corresponding icon assets
const DAY_ICONS: Record<string, string> = {
  'Rose Day': '/assets/generated/flower-icon.dim_128x128.png',
  'Propose Day': '/assets/generated/ring-icon.dim_128x128.png',
  'Chocolate Day': '/assets/generated/chocolate-icon.dim_128x128.png',
  'Teddy Day': '/assets/generated/teddy-icon.dim_128x128.png',
  'Promise Day': '/assets/generated/promise-icon.dim_128x128.png',
  'Hug Day': '/assets/generated/hug-icon.dim_128x128.png',
  'Kiss Day': '/assets/generated/kiss-icon.dim_128x128.png',
};

export default function FlowerField({ dayName }: FlowerFieldProps) {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  const handleFlowerClick = () => {
    const line = getRandomPickupLine(dayName);
    setSelectedLine(line.text);
  };

  // Get the appropriate icon for the current day
  const iconSrc = DAY_ICONS[dayName] || DAY_ICONS['Rose Day'];

  // Generate 12 items with varied positions and animations
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 8 + 5) % 90}%`,
    animationDelay: `${i * 0.5}s`,
    animationDuration: `${3 + (i % 3)}s`,
  }));

  return (
    <>
      <div className="flower-field">
        {items.map((item) => (
          <button
            key={item.id}
            className="flower-button"
            style={{
              left: item.left,
              animationDelay: item.animationDelay,
              animationDuration: item.animationDuration,
            }}
            onClick={handleFlowerClick}
            aria-label="Click for a pickup line"
          >
            <img
              src={iconSrc}
              alt={dayName}
              className="flower-image"
            />
          </button>
        ))}
      </div>

      <PickupLineOverlay
        line={selectedLine}
        open={!!selectedLine}
        onClose={() => setSelectedLine(null)}
      />
    </>
  );
}
