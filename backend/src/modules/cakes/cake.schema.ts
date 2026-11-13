import { z } from 'zod';

const boolCoerce = z
  .union([z.boolean(), z.string()])
  .transform((v) => v === true || v === 'true');

export const createCakeSchema = z.object({
  name: z.string().trim().min(1).max(100),
  description: z.string().trim().max(2000).nullable().optional(),
  categoryId: z.coerce.number().int().positive(),
  originalPriceRupees: z.coerce.number().positive(),
  discountPercent: z.coerce.number().min(0).max(100).default(0),
  imageUrl: z.string().nullable().optional(),
  isFeatured: boolCoerce.optional().default(false),
  isCounterCake: boolCoerce.optional().default(false),
  isAvailable: boolCoerce.optional().default(true),
});

export const updateCakeSchema = createCakeSchema.partial();

export const cakeAvailabilitySchema = z.object({ isAvailable: boolCoerce });
export const cakeFeaturedSchema = z.object({ isFeatured: boolCoerce });
export const cakeCounterSchema = z.object({ isCounterCake: boolCoerce });
export const cakeStatusSchema = z.object({ isActive: boolCoerce });