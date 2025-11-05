import { useEffect, useState } from 'react';

const imageCache = new Map<string, boolean>();

export const useImagePreloader = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(imageCache.has(src));

  useEffect(() => {
    if (imageCache.has(src)) {
      setIsLoaded(true);
      return;
    }

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      imageCache.set(src, true);
      setIsLoaded(true);
    };

    img.onerror = () => {
      setIsLoaded(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return isLoaded;
};

// Preload multiple images
export const preloadImages = (urls: string[]) => {
  urls.forEach((url) => {
    if (!imageCache.has(url)) {
      const img = new Image();
      img.src = url;
      img.onload = () => imageCache.set(url, true);
    }
  });
};
