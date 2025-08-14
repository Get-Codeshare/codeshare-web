'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { MagicSVG } from './MagicSVG';

export const Wordmark = () => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full overflow-hidden">
      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-none">
          <MagicSVG
            className="h-auto w-full"
            gradientFrom={theme === 'dark' ? '#9E7AFF' : '#8B5CF6'}
            gradientSize={200}
            gradientTo={theme === 'dark' ? '#FE8BBB' : '#EC4899'}
            height={400}
            strokeColor={theme === 'dark' ? '#404040' : '#737373'}
            strokeWidth={1}
            width={2000}
          >
            <text
              x="1000"
              y="280"
              textAnchor="middle"
              fontSize="240"
              fontWeight="900"
              fontFamily="Space Grotesk, sans-serif"
              letterSpacing="0.15em"
            >
              CODESHARE
            </text>
          </MagicSVG>
        </div>
      </div>
    </div>
  );
};