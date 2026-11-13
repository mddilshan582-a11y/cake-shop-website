import { z } from 'zod';

// Allow an absolute URL or a relative path (e.g. /shop/cakes).
const linkOrPath = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v.startsWith('/') || /^https?:\/\//.test(v), { message: 'Button link must be a valid URL or a path starting with "/"' });

export const createHeroSlideSchema = z.object({
  title: z.string().trim().max(120).nullable().optional(),
  subtitle: z.string().trim().max(300).nullable().optional(),
  buttonText: z.string().trim().max(60).nullable().optional(),
  buttonLink: linkOrPath.nullable().optional(),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.coerce.boolean().optional(),
});

export const updateHeroSlideSchema = z.object({
  title: z.string().trim().max(120).nullable().optional(),
  subtitle: z.string().trim().max(300).nullable().optional(),
  buttonText: z.string().trim().max(60).nullable().optional(),
  buttonLink: linkOrPath.nullable().optional(),
  displayOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.coerce.boolean().optional(),
});

export const heroSlideStatusSchema = z.object({
  isActive: z.coerce.boolean(),
});