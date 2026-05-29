/// <reference types="vite/client" />

const images = import.meta.glob([
  '/src/assets/images/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  '/src/assets/images1/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  '/src/assets/images 2/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  '/src/assets/images 3/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
], { eager: true, import: 'default' });

export function resolveImagePath(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Normalize path query to be prefix-agnostic and case-insensitive
  const cleanQuery = path.replace(/^\.?\//, '').toLowerCase();

  const keys = Object.keys(images);
  for (const key of keys) {
    const cleanKey = key.replace(/^\.?\//, '').toLowerCase();
    if (cleanKey === cleanQuery || cleanKey.endsWith(cleanQuery) || cleanQuery.endsWith(cleanKey)) {
      return images[key] as string;
    }
  }

  return path;
}
