/** Small path helpers, kept apart from the route tables so the app shell does not have to load those. */
/**
 * Normalizes a URL path by ensuring trailing slash for directory routes
 */
export function normalizePath(path: string): string {
  if (!path || path === '') return '/';
  // Strip protocol/host if passed
  try {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      const url = new URL(path);
      path = url.pathname;
    }
  } catch {
    // ignore
  }
  // Strip query string and hash
  path = path.split('?')[0].split('#')[0];
  if (!path.startsWith('/')) path = '/' + path;
  if (!path.endsWith('/') && !path.includes('.')) path = path + '/';
  return path;
}

/**
 * Detect language from path: starts with /en/ is 'en', otherwise 'de'
 */
export function getLanguageFromPath(path: string): 'de' | 'en' {
  const norm = normalizePath(path);
  if (norm === '/en/' || norm.startsWith('/en/')) {
    return 'en';
  }
  return 'de';
}
