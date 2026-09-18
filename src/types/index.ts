// ============================================
// The Pizza Kitchen - TypeScript Types
// ============================================

export type Currency = "PKR";

export interface MenuItemVariant {
  size: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  priceNote?: string;
  image?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  inStock?: boolean;
  categoryId?: string;
  subCategoryId?: string;
  variants?: MenuItemVariant[];
}

export interface MenuSubCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  description?: string;
  subCategories: MenuSubCategory[];
}

export interface SpecialDeal {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price?: number;
  oldPrice?: number;
  badge?: string;
  image: string;
  ctaText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date?: string;
  initial: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  address: string;
  addressShort: string;
  phone1: string;
  phone2: string;
  whatsapp: string;
  email: string;
  hours: string;
  mapUrl: string;
  mapEmbedUrl: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  svgPath: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export type DeviceTier = "low" | "medium" | "high";

export interface DeviceCapabilities {
  tier: DeviceTier;
  prefersReducedMotion: boolean;
  isMobile: boolean;
  hasSlowConnection: boolean;
  deviceMemory: number | null;
  hardwareCores: number | null;
  enableHeavyAnimations: boolean;
  enableParallax: boolean;
  enableVideo: boolean;
}

export * from "./orders";
export * from "./admin";