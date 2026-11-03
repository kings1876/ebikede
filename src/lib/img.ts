/** Small variant of a product image (main-s.webp 480x360, gallery-N-s.webp 240x180) for cards and thumbnails. */
export const smallImg = (src: string): string => src.replace(/\.webp$/, '-s.webp');
