export interface ProductImage {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
  id?: string;
}


// export interface GalleryConfig {
//   title: string;
//   images: ProductImage[];
//   enableZoom?: boolean;
//   position?: 'bottom' | 'left' | 'right';
//   aspectRatio?: '4/3' | '16/9' | '1/1' | 'auto';
//   showThumbnails?: boolean;
//   autoPlay?: boolean;
//   autoPlayInterval?: number;
// }

// export interface GalleryState {
//   activeIndex: number;
//   isZoomed: boolean;
//   isPlaying: boolean;
//   isGalleryInitialized: boolean;
// }

// export interface GalleryControls {
//   next: () => void;
//   prev: () => void;
//   goTo: (index: number) => void;
//   toggleZoom: () => void;
//   toggleAutoPlay: () => void;
//   setIsZoomed: (zoomed: boolean) => void;
// }

// export type UseGalleryReturn = GalleryState & GalleryControls & {
//   currentImage: GalleryImage;
// };