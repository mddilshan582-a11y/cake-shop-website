import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiError } from '../../middleware/errorHandler';
import { toPaise } from '../../utils/pricing';
import { toCakeView } from './cake.service';
import {
  createCakeSchema,
  updateCakeSchema,
  cakeAvailabilitySchema,
  cakeFeaturedSchema,
  cakeCounterSchema,
  cakeStatusSchema,
} from './cake.schema';

function uploadedUrl(req: Request): string | null {
  const file = (req as unknown as { file?: { filename?: string } }).file;
  if (file && file.filename) {
    return '/uploads/' + file.filename;
  }
  return null;
}

async function assertCategoryExists(categoryId: number): Promise<void> {
  const cat = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!cat) throw new ApiError(400, 'Selected category does not exist');
}

async function getCakeOr404(id: number): Promise<void> {
  const existing = await prisma.cake.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, 'Cake not found');
}

export const listCakes = asyncHandler(async (req: Request, res: Response) => {
  const where: Record<string, unknown> = {};

  if (req.query.categoryId) {
    where.categoryId = Number(req.query.categoryId);
  }
  if (req.query.featured !== undefined) {
    where.isFeatured = req.query.featured === 'true';
  }
  if (req.query.counter !== undefined) {
    where.isCounterCake = req.query.counter === 'true';
  }
  if (req.query.available !== undefined) {
    where.isAvailable = req.query.available === 'true';
  }

  const cakes = await prisma.cake.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
  res.status(200).json(cakes.map(toCakeView));
});

export const getCake = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const cake = await prisma.cake.findUnique({ where: { id }, include: { category: true } });
  if (!cake) throw new ApiError(404, 'Cake not found');
  res.status(200).json(toCakeView(cake));
});

export const createCake = asyncHandler(async (req: Request, res: Response) => {
  const data = createCakeSchema.parse(req.body);
  await assertCategoryExists(data.categoryId);
  const imageUrl = uploadedUrl(req) ?? data.imageUrl ?? null;

  const cake = await prisma.cake.create({
    data: {
      name: data.name,
      description: data.description ?? null,
      originalPrice: toPaise(data.originalPriceRupees),
      discountPercent: data.discountPercent,
      imageUrl: imageUrl,
      isFeatured: data.isFeatured,
      isCounterCake: data.isCounterCake,
      isAvailable: data.isAvailable,
      categoryId: data.categoryId,
    },
    include: { category: true },
  });
  res.status(201).json(toCakeView(cake));
});

export const updateCake = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = updateCakeSchema.parse(req.body);
  await getCakeOr404(id);
  if (data.categoryId) {
    await assertCategoryExists(data.categoryId);
  }

  const uploaded = uploadedUrl(req);
  const imageUrl = uploaded ? uploaded : data.imageUrl !== undefined ? data.imageUrl : null;

  const cake = await prisma.cake.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description !== undefined ? data.description : undefined,
      categoryId: data.categoryId,
      originalPrice: data.originalPriceRupees !== undefined ? toPaise(data.originalPriceRupees) : undefined,
      discountPercent: data.discountPercent,
      imageUrl: imageUrl,
      isFeatured: data.isFeatured,
      isCounterCake: data.isCounterCake,
      isAvailable: data.isAvailable,
    },
    include: { category: true },
  });
  res.status(200).json(toCakeView(cake));
});

async function patchCakeField(res: Response, id: number, field: string, value: boolean): Promise<void> {
  const cake = await prisma.cake.update({
    where: { id },
    data: { [field]: value } as never,
    include: { category: true },
  });
  res.status(200).json(toCakeView(cake));
}

export const setCakeStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { isActive } = cakeStatusSchema.parse(req.body);
  await getCakeOr404(id);
  await patchCakeField(res, id, 'isAvailable', isActive);
});

export const setCakeAvailability = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { isAvailable } = cakeAvailabilitySchema.parse(req.body);
  await getCakeOr404(id);
  await patchCakeField(res, id, 'isAvailable', isAvailable);
});

export const setCakeFeatured = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { isFeatured } = cakeFeaturedSchema.parse(req.body);
  await getCakeOr404(id);
  await patchCakeField(res, id, 'isFeatured', isFeatured);
});

export const setCakeCounter = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { isCounterCake } = cakeCounterSchema.parse(req.body);
  await getCakeOr404(id);
  await patchCakeField(res, id, 'isCounterCake', isCounterCake);
});