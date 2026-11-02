export type Language = 'de' | 'en';

export interface TaxonomyRoute {
  id: string;
  pathDe: string;
  pathEn: string;
  section: 'shop' | 'landing' | 'accessories' | 'guides' | 'service';
  titleTemplateDe: (minPrice?: number) => string;
  titleTemplateEn: (minPrice?: number) => string;
  metaDe: string;
  metaEn: string;
  h1De: string;
  h1En: string;
  subtitleDe?: string;
  subtitleEn?: string;
  filterCriteria?: {
    category?: string;
    subCategory?: string;
    motor?: string;
    gender?: string;
    priceMax?: number;
    priceMin?: number;
    useCase?: string;
    deal?: boolean;
    brand?: string;
    accessoryType?: string;
  };
  noindex?: boolean;
}

export type MotorType = 'Bosch' | 'Shimano Steps' | 'Yamaha' | 'Bafang' | 'Fazua' | 'Brose';

export type BikeCategory =
  | 'e-mountainbikes'
  | 'e-mountainbikes-hardtail'
  | 'e-mountainbikes-fully'
  | 'e-trekkingbikes'
  | 'e-citybikes'
  | 'e-lastenraeder'
  | 's-pedelecs'
  | 'e-rennraeder'
  | 'e-gravelbikes'
  | 'e-faltraeder';

export type FrameGender = 'damen' | 'herren' | 'tiefeinsteiger' | 'unisex' | 'senioren';

export interface Product {
  id: string;
  slug: string;
  brand: string;
  name_de: string;
  name_en: string;
  description_de: string;
  description_en: string;
  category: BikeCategory;
  price: number;
  originalPrice?: number;
  motor: MotorType;
  motorDetails: string;
  torqueNm: number;
  batteryWh: number;
  rangeKm?: number;
  weightKg?: number;
  gender: FrameGender;
  useCases: string[];
  isPreviousYear?: boolean;
  images: string[];
  sizes: string[];
  colors: { nameDe: string; nameEn: string; hex: string }[];
  features_de: string[];
  features_en: string[];
  inStock: boolean;
  specs: {
    frameMaterial: string;
    gears: string;
    brakes: string;
    fork: string;
    wheelSize: string;
  };
}

export interface Accessory {
  id: string;
  slug: string;
  brand: string;
  name_de: string;
  name_en: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  description_de: string;
  description_en: string;
}

export interface TrustpilotReview {
  id: string;
  productId: string;
  author: string;
  city: string;
  country: string;
  rating: number; // 1-5
  date: string;
  titleDe: string;
  titleEn: string;
  commentDe: string;
  commentEn: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
}

export interface CartItem {
  product: Product | Accessory;
  isAccessory?: boolean;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
}

export interface OrderData {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  language: Language;
  paymentMethod: 'sepa' | 'crypto';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  date: string;
}
