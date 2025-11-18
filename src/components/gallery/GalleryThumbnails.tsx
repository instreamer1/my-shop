'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import { GalleryImage } from '@/src/types/gallery';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';



interface GalleryThumbnailsProps {
  images: GalleryImage[];
  activeIndex: number;
  onThumbClick: (index: number) => void;
  thumbSwiperRef: React.MutableRefObject<SwiperType | null>;
}

interface GalleryThumbnailsProps {
  images: GalleryImage[];
  activeIndex: number;
  onThumbClick: (index: number) => void;
  thumbSwiperRef: React.MutableRefObject<SwiperType | null>;
}

export function GalleryThumbnails({
  images,
  activeIndex,
  onThumbClick,
  thumbSwiperRef,
}: GalleryThumbnailsProps) {
  return (
    <div className="gallery_thumbnails relative mt-4">
      <div className="gallery_thumbnails-container relative px-8">
        <Swiper
          onSwiper={(swiper) => (thumbSwiperRef.current = swiper)}
          modules={[FreeMode, Navigation]}
          freeMode={true}
          watchSlidesProgress={true}
          slidesPerView="auto"
          spaceBetween={8}
          navigation={{
            prevEl: '.gallery_thumbnails-scroll-back',
            nextEl: '.gallery_thumbnails-scroll-forth',
          }}
          className="gallery_thumbnails-list"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id || index} className="!w-auto gallery_thumb">
              <button
                className={`gallery_thumb-link block p-1 rounded border-2 transition-all ${
                  index === activeIndex
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => onThumbClick(index)}
                aria-label={`View image ${index + 1}: ${image.alt}`}
                aria-current={index === activeIndex}
              >
                <div className="w-[59px] h-[78px] relative"> {/* 👈 Добавлен контейнер */}
                  <Image
                    src={image.thumb}
                    alt={image.alt}
                    fill
                    className="object-cover rounded"
                    sizes="59px" // 👈 Добавлен sizes
                  />
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кнопки навигации */}
        <button 
          className="gallery_thumbnails-scroll-back absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 w-8 h-8 rounded-full shadow-lg flex items-center justify-center z-10 border border-gray-200"
          aria-label="Previous thumbnails"
        >
          <ChevronLeftIcon />
        </button>
        <button 
          className="gallery_thumbnails-scroll-forth absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 w-8 h-8 rounded-full shadow-lg flex items-center justify-center z-10 border border-gray-200"
          aria-label="Next thumbnails"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}