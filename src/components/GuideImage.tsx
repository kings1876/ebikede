import React from 'react';

/** Guide photos live in /images/guides/<dir>/ as <name>.avif|webp (full) and <name>-s.avif|webp (half width). */
export const GuideImage: React.FC<{
  dir: string;
  name: 'hero' | 'inline-1' | 'inline-2';
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}> = ({ dir, name, alt, width, height, priority }) => {
  const base = `/images/guides/${dir}/${name}`;
  const half = Math.round(width / 2);
  const sizes = '(min-width: 896px) 896px, 100vw';
  const set = (ext: string) => `${base}-s.${ext} ${half}w, ${base}.${ext} ${width}w`;
  return (
    <>
      {priority && <link rel="preload" as="image" type="image/avif" imageSrcSet={set('avif')} imageSizes={sizes} fetchPriority="high" />}
      <picture>
        <source srcSet={set('avif')} sizes={sizes} type="image/avif" />
        <source srcSet={set('webp')} sizes={sizes} type="image/webp" />
        <img
          src={`${base}.webp`}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className="h-auto w-full rounded-2xl border border-slate-200 bg-slate-100"
        />
      </picture>
    </>
  );
};
