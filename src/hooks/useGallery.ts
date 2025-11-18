import { useState, useCallback, useEffect, useRef } from 'react';
import { GalleryImage, UseGalleryReturn } from '@/types/gallery';

interface UseGalleryProps {
  images: GalleryImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function useGallery({ 
  images, 
  autoPlay = false, 
  autoPlayInterval = 4000 
}: UseGalleryProps): UseGalleryReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isGalleryInitialized, setIsGalleryInitialized] = useState(false);
  
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Авто-инициализация галереи
  useEffect(() => {
    if (images.length > 1) {
      setIsGalleryInitialized(true);
    } else if (images.length === 1) {
      checkSingleImage(images[0]);
    }
  }, [images]);

  // Автоплей функциональность
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      autoPlayRef.current = setInterval(() => {
        next();
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPlaying, images.length, autoPlayInterval]);

  const checkSingleImage = async (image: GalleryImage) => {
    const img = new window.Image();
    img.onload = () => {
      // Если изображение достаточно большое, инициализируем галерею
      const shouldInitialize = img.width > 400 || img.height > 400;
      setIsGalleryInitialized(shouldInitialize);
    };
    img.onerror = () => {
      setIsGalleryInitialized(true);
    };
    img.src = image.src;
  };

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setActiveIndex(index);
    }
  }, [images.length]);

  const toggleZoom = useCallback(() => {
    setIsZoomed((current) => !current);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsPlaying((current) => !current);
  }, []);

  const handleSetIsZoomed = useCallback((zoomed: boolean) => {
    setIsZoomed(zoomed);
    // При открытии зума останавливаем автоплей
    if (zoomed) {
      setIsPlaying(false);
    }
  }, []);

  return {
    activeIndex,
    isZoomed,
    isPlaying,
    isGalleryInitialized,
    next,
    prev,
    goTo,
    toggleZoom,
    toggleAutoPlay,
    setIsZoomed: handleSetIsZoomed,
    currentImage: images[activeIndex] || images[0],
  };
}