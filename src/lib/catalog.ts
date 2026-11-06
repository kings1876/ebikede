import type { Product, TaxonomyRoute } from '../types';

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'range' | 'torque';
export const PAGE_SIZE = 24;

export interface InteractiveFilters {
  searchQuery: string;
  selectedMotor: string | null;
  selectedBrand: string | null;
  selectedGender: string | null;
  priceRange: [number, number];
  sortBy: SortKey;
}

export const NO_FILTERS: InteractiveFilters = {
  searchQuery: '',
  selectedMotor: null,
  selectedBrand: null,
  selectedGender: null,
  priceRange: [0, 15000],
  sortBy: 'featured',
};

/** Products a page shows before the visitor touches any filter: the route's own criteria (and brand page). */
export function productsForPage(products: Product[], route: TaxonomyRoute | null | undefined, brand: string | null | undefined): Product[] {
  return products.filter((p) => {
    if (brand && p.brand.toLowerCase() !== brand.toLowerCase()) return false;
    const fc = route?.filterCriteria;
    if (fc) {
      if (fc.category) {
        if (fc.category === 'e-mountainbikes') {
          if (!p.category.includes('e-mountainbikes')) return false;
        } else if (p.category !== fc.category) return false;
      }
      if (fc.brand && p.brand !== fc.brand) return false;
      if (fc.frame && !new RegExp(fc.frame, 'i').test(p.specs.frameMaterial || '')) return false;
      if (fc.text && !new RegExp(fc.text, 'i').test([p.specs.gears, p.description_de, ...(p.features_de || [])].join(' '))) return false;
      if (fc.motor && p.motor !== fc.motor) return false;
      if (fc.gender && p.gender !== fc.gender) return false;
      if (fc.priceMax && p.price > fc.priceMax) return false;
      if (fc.priceMin && p.price < fc.priceMin) return false;
      if (fc.useCase && !p.useCases.includes(fc.useCase)) return false;
      if (fc.deal && !p.originalPrice && !p.isPreviousYear) return false;
    }
    return true;
  });
}

/** The visitor's own filters and sort order, applied on top of productsForPage. */
export function applyInteractive(list: Product[], f: InteractiveFilters): Product[] {
  const q = f.searchQuery.toLowerCase().trim();
  return list
    .filter((p) => {
      if (q) {
        const hit = p.name_de.toLowerCase().includes(q) || p.name_en.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.motor.toLowerCase().includes(q);
        if (!hit) return false;
      }
      if (f.selectedMotor && p.motor !== f.selectedMotor) return false;
      if (f.selectedBrand && p.brand !== f.selectedBrand) return false;
      if (f.selectedGender && p.gender !== f.selectedGender) return false;
      if (p.price < f.priceRange[0] || p.price > f.priceRange[1]) return false;
      return true;
    })
    .sort((a, b) => {
      if (f.sortBy === 'price-asc') return a.price - b.price;
      if (f.sortBy === 'price-desc') return b.price - a.price;
      if (f.sortBy === 'range') return b.batteryWh - a.batteryWh;
      if (f.sortBy === 'torque') return (b.torqueNm || 0) - (a.torqueNm || 0);
      return 0;
    });
}

export function filtersActive(f: InteractiveFilters, visibleCount: number): boolean {
  return (
    visibleCount > PAGE_SIZE ||
    f.sortBy !== 'featured' ||
    f.searchQuery.trim().length > 0 ||
    f.selectedMotor !== null ||
    f.selectedBrand !== null ||
    f.selectedGender !== null ||
    f.priceRange[0] > 0 ||
    f.priceRange[1] < 15000
  );
}
