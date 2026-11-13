import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiError } from '../../middleware/errorHandler';
import { createHeroSlideSchema, updateHeroSlideSchema, heroSlideStatusSchema } from './heroSlide.schema';

function uploadedUrl(req: Request): string | null {
  const file = (req as unknown as { file?: { filename?: string } }).file;
  if (file && file.filename) return '/uploads/' + file.filename;
  return null;
}

function optionalText(v: unknown): string | null {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  return s === '' ? null : s;
}

export const listHeroSlides = asyncHandler(async (_req: Request, res: Response) => {
  const slides = await prisma.heroSlide.findMany({ orderBy: { displayOrder: 'asc' } });
  res.status(200).json(slides);
});

export const getHeroSlide = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const slide = await prisma.heroSlide.findUnique({ where: { id } });
  if (!slide) throw new ApiError(404, 'Hero slide not found');
  res.status(200).json(slide);
});

export const createHeroSlide = asyncHandler(async (req: Request, res: Response) => {
  const data = createHeroSlideSchema.parse(req.body);
  const imageUrl = uploadedUrl(req);
  if (!imageUrl) throw new ApiError(400, 'Hero slide image is required');

  const slide = await prisma.heroSlide.create({
    data: {
      imageUrl,
      title: optionalText(data.title),
      subtitle: optionalText(data.subtitle),
      buttonText: optionalText(data.buttonText),
      buttonLink: optionalText(data.buttonLink),
      displayOrder: data.displayOrder,
      isActive: data.isActive === undefined ? true : data.isActive,
    },
  });
  res.status(201).json(slide);
});

export const updateHeroSlide = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = updateHeroSlideSchema.parse(req.body);
  const existing = await prisma.heroSlide.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, 'Hero slide not found');

  const imageUrl = uploadedUrl(req);
  const slide = await prisma.heroSlide.update({
    where: { id },
    data: {
      imageUrl: imageUrl ?? existing.imageUrl,
      title: data.title !== undefined ? optionalText(data.title) : existing.title,
      subtitle: data.subtitle !== undefined ? optionalText(data.subtitle) : existing.subtitle,
      buttonText: data.buttonText !== undefined ? optionalText(data.buttonText) : existing.buttonText,
      buttonLink: data.buttonLink !== undefined ? optionalText(data.buttonLink) : existing.buttonLink,
      displayOrder: data.displayOrder ?? existing.displayOrder,
      isActive: data.isActive === undefined ? existing.isActive : data.isActive,
    },
  });
  res.status(200).json(slide);
});

export const setHeroSlideStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { isActive } = heroSlideStatusSchema.parse(req.body);
  const existing = await prisma.heroSlide.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, 'Hero slide not found');
  const slide = await prisma.heroSlide.update({ where: { id }, data: { isActive } });
  res.status(200).json(slide);
});

export const deleteHeroSlide = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const existing = await prisma.heroSlide.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, 'Hero slide not found');
  await prisma.heroSlide.delete({ where: { id } });
  res.status(204).send();
});