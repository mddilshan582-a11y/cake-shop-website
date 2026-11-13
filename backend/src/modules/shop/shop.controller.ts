import { Request, Response } from 'express';
import { ApiError } from '../../middleware/errorHandler';
import { asyncHandler } from '../../utils/asyncHandler';
import {
  getPublicCategories,
  getPublicCakes,
  getPublicCakeById,
  getPublicCategory,
  getPublicHeroSlides,
} from './shop.service';

function boolOrUndefined(v: unknown): boolean | undefined {
  if (v === undefined) return undefined;
  return v === 'true';
}

export const listCategories = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json(await getPublicCategories());
});

export const listCakes = asyncHandler(async (req: Request, res: Response) => {
  const q = req.query as Record<string, string | undefined>;
  const catId = q.categoryId ? Number(q.categoryId) : undefined;
  const cakes = await getPublicCakes({
    categoryId: catId,
    featured: boolOrUndefined(q.featured),
    counter: boolOrUndefined(q.counter),
  });
  res.status(200).json(cakes);
});

export const listFeatured = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json(await getPublicCakes({ featured: true }));
});

export const listCounter = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json(await getPublicCakes({ counter: true }));
});

export const cakesByCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await getPublicCategory(Number(req.params.id));
  if (!category) throw new ApiError(404, 'Category not found');
  const cakes = await getPublicCakes({ categoryId: category.id });
  res.status(200).json(cakes);
});

export const getCake = asyncHandler(async (req: Request, res: Response) => {
  const cake = await getPublicCakeById(Number(req.params.id));
  if (!cake) throw new ApiError(404, 'Cake not found');
  res.status(200).json(cake);
});

export const listHeroSlides = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json(await getPublicHeroSlides());
});