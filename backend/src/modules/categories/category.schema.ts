import { z } from 'zod';

// imageUrl may be: an absolute/relative URL, null, or empty (treated as "clear/follows upload").
const imageUrlOrEmpty = z
  .string()
  .trim()
  .max(500)
  .nullable()
  .optional()
  .transform((v) => (v === '' ? null : v));

export const createCategorySchema = z.object({
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().max(500).nullable().optional(),
  imageUrl: imageUrlOrEmpty,
  isActive: z.boolean().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  description: z.string().trim().max(500).nullable().optional(),
  imageUrl: imageUrlOrEmpty,
});

export const categoryStatusSchema = z.object({
  isActive: z.boolean(),
});