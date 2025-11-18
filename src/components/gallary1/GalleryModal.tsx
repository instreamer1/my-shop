"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface GalleryModalProps {
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

export default function GalleryModal({
  images,
  index,
  onClose,
  onIndexChange,
}: GalleryModalProps) {
  const [current, setCurrent] = useState(index);

  const startX = useRef(0);
  const deltaX = useRef(0);

  useEffect(() => {
    onIndexChange(current);
  }, [current, onIndexChange]);

  // Закрытие по ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  // Свайп
  const handleTouchStart = (e: any) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: any) => {
    deltaX.current = e.touches[0].clientX - startX.current;
  };

  const handleTouchEnd = () => {
    if (deltaX.current > 50) prev();
    if (deltaX.current < -50) next();
    deltaX.current = 0;
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-3xl"
      >
        ✕
      </button>

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-4xl"
      >
        ‹
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-4xl"
      >
        ›
      </button>

      {/* IMAGE */}
      <div
        className="relative w-full max-w-[90%] h-[80%]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[current]}
          alt="fullscreen"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
