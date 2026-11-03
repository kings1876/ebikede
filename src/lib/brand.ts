/** URL slug for a brand name (ASCII, lowercase): "Zündapp" -> "zuendapp". */
export const brandSlug = (brand: string): string =>
  brand.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
