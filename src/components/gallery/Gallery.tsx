"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import { GalleryThumbnails } from "./GalleryThumbnails";
import { GalleryZoom } from "./GalleryZoom";


import { ChevronLeftIcon } from "./icons/ChevronLeftIcon";
import { ChevronRightIcon } from "./icons/ChevronRightIcon";
import { ZoomIcon } from "./icons/ZoomIcon";
import { GalleryConfig } from "@/src/types/gallery";
import { useGallery } from "@/src/hooks/useGallery";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

export default function Gallery(config: GalleryConfig) {
  const {
    images,
    title,
    enableZoom = true,
    aspectRatio = '4/3',
    showThumbnails = true,
    autoPlay = false,
    autoPlayInterval = 4000,
  } = config;

  const {
    activeIndex,
    isZoomed,
    isPlaying,
    isGalleryInitialized,
    next,
    prev,
    goTo,
    toggleZoom,
    setIsZoomed,
    currentImage,
  } = useGallery({ images, autoPlay, autoPlayInterval });

  const mainSwiperRef = useRef<SwiperType | null>(null);
  const thumbSwiperRef = useRef<SwiperType | null>(null);

  const handleMainSlideChange = (swiper: SwiperType) => {
    goTo(swiper.activeIndex);
    if (thumbSwiperRef.current) {
      thumbSwiperRef.current.slideTo(swiper.activeIndex);
    }
  };

  const handleThumbClick = (index: number) => {
    goTo(index);
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index);
    }
  };

  // Определяем sizes для основного изображения
  const getMainImageSizes = () => {
    return "(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1200px) 60vw, 50vw";
  };

  // Простой режим для одного изображения
  if (!isGalleryInitialized && images.length === 1) {
    return (
      <section className="gallery  " aria-label={title}>
        <div 
          className={`gallery_photos  relative bg-gray-100 rounded-lg overflow-hidden aspect-${aspectRatio.replace('/', '/')}`}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-contain cursor-pointer"
            onClick={enableZoom ? toggleZoom : undefined}
            priority
            // sizes={getMainImageSizes()} 
          />
          {enableZoom && (
            <button
              className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
              onClick={toggleZoom}
              aria-label="Zoom image"
            >
              <ZoomIcon />
            </button>
          )}
        </div>
        
        <GalleryZoom 
          image={currentImage} 
          isOpen={isZoomed} 
          onClose={() => setIsZoomed(false)} 
        />
      </section>
    );
  }

  // Полнофункциональная галерея
  return (
    <section className="gallery flex flex-col gap-4" aria-label={title}>
      {/* Основное изображение */}
      <div 
        className={`gallery_photos relative bg-gray-100 rounded-lg overflow-hidden aspect-${aspectRatio.replace('/', '/')}`}
      >
        <Swiper
          onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          onSlideChange={handleMainSlideChange}
          initialSlide={activeIndex}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id || index}>
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain cursor-zoom-in"
                  onClick={enableZoom ? toggleZoom : undefined}
                  priority={index === 0}
                  sizes={getMainImageSizes()} // 👈 Добавлен sizes
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Элементы управления */}
        <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
          <button
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all pointer-events-auto"
            onClick={prev}
            aria-label="Previous image"
          >
            <ChevronLeftIcon />
          </button>
          <button
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all pointer-events-auto"
            onClick={next}
            aria-label="Next image"
          >
            <ChevronRightIcon />
          </button>
        </div>

        {enableZoom && (
          <button
            className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
            onClick={toggleZoom}
            aria-label="Zoom image"
          >
            <ZoomIcon />
          </button>
        )}

        {/* Индикатор прогресса */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm backdrop-blur-sm">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Миниатюры */}
      {showThumbnails && images.length > 1 && (
        <GalleryThumbnails
          images={images}
          activeIndex={activeIndex}
          onThumbClick={handleThumbClick}
          thumbSwiperRef={thumbSwiperRef}
        />
      )}

      {/* Zoom модальное окно */}
      <GalleryZoom 
        image={currentImage} 
        isOpen={isZoomed} 
        onClose={() => setIsZoomed(false)} 
      />
    </section>
  );
}