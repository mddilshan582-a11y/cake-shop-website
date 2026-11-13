import { prisma } from '../../config/prisma';
import { ApiError } from '../../middleware/errorHandler';

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function ensureNoConflict(
  name: string,
  slug: string,
  excludeId?: number
): Promise<void> {
  const existing = await prisma.category.findFirst({
    where: {
      OR: [{ name: name }, { slug: slug }],
      NOT: excludeId ? { id: excludeId } : undefined,
    },
  });
  if (existing) {
    throw new ApiError(409, 'A category with the same name already exists');
  }
}