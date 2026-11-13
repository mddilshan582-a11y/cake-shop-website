export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryWithCount extends Category {
  _count: { cakes: number };
}

export interface PricingView {
  originalPrice: number;
  discountPercent: number;
  finalPrice: number;
  originalPriceFormatted: string;
  finalPriceFormatted: string;
  hasDiscount: boolean;
}

export interface Cake {
  id: number;
  name: string;
  description: string | null;
  originalPrice: number;
  discountPercent: number;
  imageUrl: string | null;
  isFeatured: boolean;
  isCounterCake: boolean;
  isAvailable: boolean;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: { id: number; name: string; slug: string } | null;
  pricing: PricingView;
}

export interface CakeInput {
  name?: string;
  description?: string | null;
  categoryId?: number;
  originalPriceRupees?: number;
  discountPercent?: number;
  isFeatured?: boolean;
  isCounterCake?: boolean;
  isAvailable?: boolean;
}

export interface HeroSlide {
  id: number;
  imageUrl: string;
  title: string | null;
  subtitle: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}