'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

const WebPlatformImageDemo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // NOTE: Add your images to the `public` folder at these paths
  const lightModeImage = '/web-light.png';
  const darkModeImage = '/web-dark.png';

  if (!mounted) {
    // Render a placeholder or null during server-side rendering
    return <div className="w-full h-full bg-muted/30 rounded-md" />;
  }

  const imageUrl = theme === 'dark' ? darkModeImage : lightModeImage;

  return (
    <div className="w-full h-full p-2">
      {/* This wrapper div creates the crop effect */}
      <div className="w-full h-full rounded-md overflow-hidden shadow-lg">
        <Image
          src={imageUrl}
          alt="Web Platform Demo"
          width={1200}
          height={675}
          // The scale transform zooms the image in, the wrapper crops it.
          className="object-cover w-full h-full transform scale-125"
          priority
        />
      </div>
    </div>
  );
};

export { WebPlatformImageDemo };