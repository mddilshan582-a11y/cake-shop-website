import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiError } from '../../middleware/errorHandler';
import { createCategorySchema, updateCategorySchema, categoryStatusSchema } from './category.schema';
import { slugify, ensureNoConflict } from './category.service';

const withCount = { _count: { select: { cakes: true } } };

// Uploaded file wins over any body imageUrl. Returns null if no file uploaded.
function uploadedImageUrl(req: Request): string | null {
  const file = (req as unknown as { file?: { filename?: string } }).file;
  if (file && file.filename) return '/uploads/' + file.filename;
  return null;
}
// Category imageUrl may be cleared by sending an empty string (JSON) or removed via uploads.
function resolveImageUrl(uploaded: string | null, bodyImageUrl: unknown, fallback: string | null): string | null {
  if (uploaded) return uploaded;
  if (bodyImageUrl === undefined) return fallback;
  if (bodyImageUrl === null || bodyImageUrl === '') return null;
  return String(bodyImageUrl);
}

export const listCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    include: withCount,
    orderBy: { name: 'asc' },
  });
  res.status(200).json(categories);
});

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const category = await prisma.category.findUnique({ where: { id }, include: withCount });
  if (!category) throw new ApiError(404, 'Category not found');
  res.status(200).json(category);
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const data = createCategorySchema.parse(req.body);
  const slug = slugify(data.name);
  await ensureNoConflict(data.name, slug);
  const uploaded = uploadedImageUrl(req);
  const imageUrl = resolveImageUrl(uploaded, data.imageUrl, null);
  const category = await prisma.category.create({
    data: {
      name: data.name,
      slug: slug,
      description: data.description ?? null,
      imageUrl: imageUrl,
      isActive: data.isActive ?? true,
    },
  });
  res.status(201).json(category);
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = updateCategorySchema.parse(req.body);
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, 'Category not found');
  const name = data.name ?? existing.name;
  const slug = data.name ? slugify(data.name) : existing.slug;
  await ensureNoConflict(name, slug, id);
  const uploaded = uploadedImageUrl(req);
  const imageUrl = resolveImageUrl(uploaded, data.imageUrl, existing.imageUrl);
  const category = await prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.name ? slugify(data.name) : undefined,
      description: data.description,
      imageUrl: imageUrl,
    },
  });
  res.status(200).json(category);
});

export const setCategoryStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { isActive } = categoryStatusSchema.parse(req.body);
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, 'Category not found');
  const category = await prisma.category.update({ where: { id }, data: { isActive } });
  res.status(200).json(category);
});