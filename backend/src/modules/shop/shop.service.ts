import { prisma } from '../../config/prisma';
import { toCakeView } from '../cakes/cake.service';

/** Public visibility: cake must be available AND in an active category. */
export function publicCakeWhere(categoryId?: number) {
  return {
    isAvailable: true,
    category: { isActive: true },
    ...(categoryId ? { categoryId: Number(categoryId) } : {}),
  };
}

export async function getPublicCategories() {
  return prisma.category.findMany({
    where: { isActive: true },
    include: { _count: { select: { cakes: { where: { isAvailable: true } } } } },
    orderBy: { name: 'asc' },
  });
}

export async function getPublicCakes(opts: {
  categoryId?: number;
  featured?: boolean;
  counter?: boolean;
}) {
  const where = publicCakeWhere(opts.categoryId);
  if (opts.featured !== undefined) (where as Record<string, unknown>).isFeatured = opts.featured;
  if (opts.counter !== undefined) (where as Record<string, unknown>).isCounterCake = opts.counter;
  const cakes = await prisma.cake.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
  return cakes.map(toCakeView);
}

export async function getPublicCakeById(id: number) {
  const cake = await prisma.cake.findFirst({
    where: { id, isAvailable: true, category: { isActive: true } },
    include: { category: true },
  });
  return cake ? toCakeView(cake) : null;
}

export async function getPublicCategory(id: number) {
  return prisma.category.findFirst({ where: { id, isActive: true } });
}

export async function getPublicHeroSlides() {
  return prisma.heroSlide.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });
}