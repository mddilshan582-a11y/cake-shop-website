import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.cake.deleteMany({
    where: {
      name: {
        in: [
          'Test Deluxe Cake Edited',
          'Test Deluxe Cake',
          'ValidPng',
          'ValidPngCake',
          'CurlPngCake',
          'CurlPngCake2',
          'CurlPngCake3',
          'CurlPngCake4',
          'CurlPngCake5',
          'ImgB',
          'ImgCake',
          'TxtCake',
          'T',
        ],
      },
    },
  });
  await prisma.category.deleteMany({ where: { name: 'Premium Cakes' } });
  console.log('cleanup done');
}

main()
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });