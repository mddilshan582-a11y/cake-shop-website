import { Cake, Category } from '@prisma/client';
import { buildPricing, CakePricing } from '../../utils/pricing';

/** Shape of a cake response with computed pricing. */
export interface CakeView extends Cake {
  pricing: CakePricing;
  category: { id: number; name: string; slug: string } | null;
}

/** Decorate a persisted cake with computed pricing view (+ light category). */
export function toCakeView(cake: Cake & { category?: Category | null }): CakeView {
  const pricing = buildPricing(cake.originalPrice, cake.discountPercent);
  return {
    ...cake,
    pricing,
    category: cake.category ? { id: cake.category.id, name: cake.category.name, slug: cake.category.slug } : null,
  };
}