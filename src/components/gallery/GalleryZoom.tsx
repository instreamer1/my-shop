'use client';

import { GalleryImage } from '@/src/types/gallery';
import Image from 'next/image';
import { CloseIcon } from './icons/CloseIcon';


interface GalleryZoomProps {
  image: GalleryImage;
  isOpen: boolean;
  onClose: () => void;
}

export function GalleryZoom({ image, isOpen, onClose }: GalleryZoomProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Zoomed image view"
    >
      <div 
        className="relative max-w-4xl max-h-full" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="object-contain max-h-[90vh]"
            priority
            sizes="(max-width: 1200px) 90vw, 80vw" // 👈 Добавлен sizes
          />
        </div>
        <button
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
          onClick={onClose}
          aria-label="Close zoom view"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        
        {/* Информация об изображении */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-3 rounded-lg backdrop-blur-sm">
          <p className="text-sm font-medium">{image.alt}</p>
          <p className="text-xs text-gray-300 mt-1">
            {image.width} × {image.height}px
          </p>
        </div>
      </div>
    </div>
  );
}