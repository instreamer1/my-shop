"use client";
import { useState, useRef } from "react";

import Image from "next/image";
import ImageModal from "./ImageModal";

// interface GalleryProps {
//   images: string[];
// }

interface ProductImage {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
  id?: string;
}

export default function Gallery({ images }:{images: ProductImage[];}) {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Большая картинка */}
      <div
      //   className="relative h-40"
      >
        {/* <img
          src={images[current]}
          className="w-full rounded-xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        /> */}

        <Image
          src={images[current]}
          alt={`Gallery image ${current + 1}`}
          width={800}
          height={600}
          //   fill
          sizes="100%"
          //   className="w-full h-full object-cover"
          onClick={() => setIsOpen(true)}
        />

        {/* Стрелка влево */}
        {/* <button
          className="absolute top-1/2 left-2 bg-black/40 text-white rounded-full p-2"
          onClick={() =>
            setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
          }
        >
          ◀
        </button>*/}

        {/* Стрелка вправо */}
        {/* <button
          className="absolute top-1/2 right-2 bg-black/40 text-white rounded-full p-2"
          onClick={() =>
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
          }
        >
          ▶
        </button>*/}
      </div>  

      {/* Мини-превью + прокрутка + кнопки */}
      <div className="relative mt-4">
        {/* Кнопки прокрутки */}
        <button
        //   onClick={() => scroll("left")}
            onClick={() =>
            setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
          }
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 z-10"
          disabled = {current === 0}
        >
          ◀
        </button>

        <button
        //   onClick={() => scroll("right")}
          onClick={() =>
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
          }
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 z-10"
         
        >
          ▶
        </button>

        {/* Лента превью */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-10"
        >
          {images.map((img, i) => (
            <Image
             key={i}
              src={img.src}
              alt="thumb"
              width={800}
              height={600}
              //   fill
              sizes="100%"
              onClick={() => setCurrent(i)}
              className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer ${
                i === current ? "border-blue-500" : "border-transparent"
              }`}
            />
            // <img
            //   key={i}
            //   src={img}
            //   onClick={() => setCurrent(i)}
            //   className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer ${
            //     i === current ? "border-blue-500" : "border-transparent"
            //   }`}
            // />
          ))}
        </div>
      </div>

      {/* Модалка */}
      {isOpen && (
        <ImageModal
          images={images}
          currentIndex={current}
          onClose={() => setIsOpen(false)}
          setCurrentIndex={setCurrent}
        />
      )}
    </>
  );
}
