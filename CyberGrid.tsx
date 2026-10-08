import { useEffect, useState } from 'react';

interface LetterItem {
  id: string;
  char: string;
  left: string;
  top: string;
}

const CYBER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*drago4';

export default function CyberGrid() {
  const [letters, setLetters] = useState<LetterItem[]>([]);

  useEffect(() => {
    // Periodically spawn letters inside the grid space (top 60% of the screen)
    const interval = setInterval(() => {
      const randomChar = CYBER_CHARS.charAt(Math.floor(Math.random() * CYBER_CHARS.length));
      // Top 5% to 55% to fit within the 60% height container
      const topOffset = Math.floor(Math.random() * 50) + 5;
      const leftOffset = Math.floor(Math.random() * 90) + 5;

      const newId = `${Date.now()}-${Math.random()}`;
      const newLetter: LetterItem = {
        id: newId,
        char: randomChar,
        left: `${leftOffset}%`,
        top: `${topOffset}%`,
      };

      setLetters((prev) => [...prev.slice(-15), newLetter]); // Limit to max 15 active letters and append
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#02020a] pointer-events-none">
      {/* 60% height cyber background playground as specified by user */}
      <div className="bg-animation absolute top-0 left-0 w-full h-[60%] overflow-hidden">
        <div className="grid-overlay w-full h-full absolute"></div>
        
        {/* Falling/glowing cyber letters layer */}
        <div className="letters-layer w-full h-full absolute">
          {letters.map((item) => (
            <span
              key={item.id}
              className="letter absolute"
              style={{
                left: item.left,
                top: item.top,
              }}
            >
              {item.char}
            </span>
          ))}
        </div>
      </div>

      {/* Cyber gradient radial glow to make the grid pop */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-gradient-to-t from-transparent via-[rgba(0,105,185,0.15)] to-transparent blur-3xl pointer-events-none"></div>
    </div>
  );
}
