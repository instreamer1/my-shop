"use client";

import { useState } from "react";
import Image from "next/image";
import GalleryModal from "./GalleryModal";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* MAIN IMAGE */}
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden cursor-zoom-in">
        <Image
          src={images[activeIndex]}
          alt="product"
          fill
          sizes="100%"
          className="object-cover"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* THUMBNAILS */}
      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative h-20 w-16 flex-shrink-0 overflow-hidden rounded border 
              ${activeIndex === i ? "border-black" : "border-transparent"}
            `}
          >
            <Image
              src={img}
              alt="thumb"
              fill
              sizes="100%"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* FULLSCREEN MODAL */}
      {isOpen && (
        <GalleryModal
          images={images}
          index={activeIndex}
          onClose={() => setIsOpen(false)}
          onIndexChange={setActiveIndex}
        />
      )}
    </>
  );
}
