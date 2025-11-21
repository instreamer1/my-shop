import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProductImage {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
  id?: string;
}

export default function ImageModal({
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}: {
  images: ProductImage[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [slide, setSlide] = useState<"left" | "right" | "none">("none");
  // swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 30);
  }, []);

  const next = () => {
    setSlide("right");
    setTimeout(() => {
      setCurrentIndex(
        currentIndex === images.length - 1 ? 0 : currentIndex + 1
      );
      setSlide("none");
    }, 200);
  };

  const prev = () => {
    setSlide("left");
    setTimeout(() => {
      setCurrentIndex(
        currentIndex === 0 ? images.length - 1 : currentIndex - 1
      );
      setSlide("none");
    }, 200);
  };

  // swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 50) {
      // свайп влево
      if (distance > 0) next();
      // свайп вправо
      else prev();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col pt-10 ">
      <div className=" top-10 flex justify-around border-2 text-white text-3xl">
        <p>{images[currentIndex].alt}</p>
        {/* Кнопка закрытия */}
        <button onClick={onClose} className="top-4 right-4 text-white text-3xl">
          ✕
        </button>
      </div>
      {/* Большое изображение */}
      <div
        className={`flex-1 flex items-center justify-center overflow-hidden transition-opacity duration-300 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="flex-1 flex items-center justify-center overflow-hidden  "
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Image
            src={images[currentIndex].src}
            alt={`Gallery image ${images[currentIndex].alt}`}
            width={800}
            height={600}
            //   fill
            sizes="100%"
            className={`max-h-[90vh] transition-transform duration-300    ${
              zoom ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
            }`}
            onClick={() => setZoom((z) => !z)}
          />
        </div>
      </div>

      {/* Bottom previews */}
      <div className="flex gap-3 justify-center overflow-x-hidden  p-4 bg-white/100">
        {images.map((img, i) => (
          <Image
            key={i}
            src={img.src}
            alt={`Gallery image ${img.alt}`}
            width={20}
            height={20}
            onClick={() => setCurrentIndex(i)}
            className={`w-20 h-20 object-cover rounded border-2 cursor-pointer ${
              i === currentIndex ? "border-white" : "border-transparent"
            }`}
          />
        ))}
      </div>

      {/* Стрелки */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-4xl"
        // className="hidden md:block"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-4xl"
      >
        ▶
      </button>
    </div>
  );
}
