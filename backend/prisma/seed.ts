import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const BCRYPT_ROUNDS = 10;
const STAFF_USERNAME = 'staff';
const STAFF_PASSWORD = 'Staff@123';

function slugify(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const CATEGORIES = [
  { name: 'Birthday Cakes', desc: 'Cakes crafted to celebrate birthdays.' },
  { name: 'Anniversary Cakes', desc: 'Beautiful cakes for special milestones.' },
  { name: 'Wedding Cakes', desc: 'Statement cakes for weddings.' },
  { name: 'Party Cakes', desc: 'Fun, shareable cakes for every party.' },
  { name: 'Custom Cakes', desc: 'Fully customized cakes to your vision.' },
];

// [category, name, priceRupees, discount, featured, counter, imageFile, desc]
const DEMO_CAKES: [string, string, number, number, boolean, boolean, string, string][] = [
  ['Birthday Cakes', 'Belgian Chocolate Truffle', 799, 10, true, true, 'belgian-chocolate-truffle.webp', 'Rich Belgian-style chocolate cake layered with smooth chocolate cream and finished with delicate chocolate curls. A timeless choice for a luxurious birthday celebration.'],
  ['Birthday Cakes', 'Red Velvet Dream', 899, 10, true, false, 'red-velvet-dream.webp', 'Soft red velvet sponge layered with silky cream frosting and finished with elegant red velvet crumbs. A beautiful choice for birthdays and special celebrations.'],
  ['Birthday Cakes', 'Black Forest Classic', 699, 0, false, true, 'black-forest-classic.webp', 'Classic chocolate sponge layered with smooth cream and cherry filling, finished with rich chocolate shavings and cherries.'],
  ['Anniversary Cakes', 'Chocolate Heart Romance', 999, 15, true, false, 'chocolate-heart-romance.webp', 'A romantic heart-shaped chocolate cake with silky ganache, delicate chocolate decorations and a luxurious finish made for memorable celebrations.'],
  ['Anniversary Cakes', 'Golden Celebration Cake', 1199, 10, false, false, 'golden-celebration-cake.webp', 'An elegant celebration cake finished with smooth cream frosting, refined golden accents and delicate decorations for a sophisticated anniversary moment.'],
  ['Wedding Cakes', 'Royal Floral Wedding Cake', 1999, 15, true, false, 'royal-floral-wedding-cake.webp', 'An elegant multi-tier wedding cake with refined white frosting, delicate floral details and subtle golden accents for a timeless celebration.'],
  ['Wedding Cakes', 'Elegant Three-Tier Cake', 2499, 0, false, false, 'elegant-three-tier-cake.webp', 'A sophisticated three-tier celebration cake with clean ivory frosting, delicate floral details and a refined modern finish.'],
  ['Party Cakes', 'Chocolate Drip Party Cake', 899, 10, true, true, 'chocolate-drip-party-cake.webp', 'A modern celebration cake covered with smooth cream frosting and rich chocolate drip, finished with elegant chocolate decorations.'],
  ['Party Cakes', 'Oreo Crunch Delight', 749, 0, false, true, 'oreo-crunch-delight.webp', 'A creamy chocolate cake finished with crunchy cookie pieces and smooth chocolate frosting, perfect for parties and casual celebrations.'],
  ['Custom Cakes', 'Designer Celebration Cake', 1499, 10, true, false, 'designer-celebration-cake.webp', 'A sophisticated designer cake featuring elegant cream frosting, artistic chocolate details and refined decorative elements for a personalized celebration.'],
];

// Old demo cakes replaced by the new catalogue.
const LEGACY_DEMO_NAMES = [
  'Chocolate Truffle Cake',
  'Red Velvet Celebration Cake',
  'Black Forest Gateau',
  'Anniversary Rose Cake',
  'Golden Anniversary Cake',
  'Classic Wedding Cake',
  'Mini Party Cupcake Tower',
  'Fruit Fiesta Cake',
  'Custom Photo Cake',
  'Cheesecake Delight',
];

async function main(): Promise<void> {
  const passwordHash = await bcrypt.hash(STAFF_PASSWORD, BCRYPT_ROUNDS);

  await prisma.user.upsert({
    where: { username: STAFF_USERNAME },
    update: {},
    create: {
      username: STAFF_USERNAME,
      passwordHash,
      role: 'STAFF',
      isActive: true,
    },
  });

  const catBySlug = new Map<string, { id: number }>();
  for (const c of CATEGORIES) {
    const slug = slugify(c.name);
    const created = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name: c.name, slug, description: c.desc },
    });
    catBySlug.set(slug, created);
  }

  // Replace old demo cakes with the new catalogue.
  await prisma.cake.deleteMany({ where: { name: { in: LEGACY_DEMO_NAMES } } });

  for (const [catName, cakeName, priceRupees, discount, featured, counter, imageFile, desc] of DEMO_CAKES) {
    const cat = catBySlug.get(slugify(catName));
    if (!cat) continue;
    const existing = await prisma.cake.findFirst({ where: { name: cakeName } });
    const data = {
      description: desc,
      originalPrice: priceRupees * 100,
      discountPercent: discount,
      imageUrl: null, // demo image files not provided; premium fallback renders on customer site
      isFeatured: featured,
      isCounterCake: counter,
      isAvailable: true,
      categoryId: cat.id,
    };
    if (existing) {
      await prisma.cake.update({ where: { id: existing.id }, data });
    } else {
      await prisma.cake.create({ data: { ...data, name: cakeName } });
    }
  }

  const finalCount = await prisma.cake.count();

  // Demo hero slides (imageUrl empty -> carousel shows premium fallback).
  const HERO_SLIDES = [
    { title: 'Fresh Cakes for Every Celebration', subtitle: 'Handcrafted, delicious cakes baked fresh.', buttonText: 'Browse Cakes', buttonLink: '/shop/cakes', displayOrder: 1 },
    { title: 'Trending This Week', subtitle: 'Our most loved creations, ready for you.', buttonText: 'View Trending', buttonLink: '/shop', displayOrder: 2 },
    { title: 'Customize Your Own Cake', subtitle: 'Your idea, your design, your special day.', buttonText: 'Customize a Cake', buttonLink: '/shop/customized-cake', displayOrder: 3 },
  ];
  let heroIndex = 1;
  for (const s of HERO_SLIDES) {
    const existing = await prisma.heroSlide.findFirst({ where: { title: s.title } });
    const data = {
      imageUrl: '',
      title: s.title,
      subtitle: s.subtitle,
      buttonText: s.buttonText,
      buttonLink: s.buttonLink,
      displayOrder: s.displayOrder,
      isActive: true,
    };
    if (existing) {
      await prisma.heroSlide.update({ where: { id: existing.id }, data });
    } else {
      await prisma.heroSlide.create({ data });
    }
  }
  const heroCount = await prisma.heroSlide.count();

  console.log('Seed complete. Demo cakes:', finalCount, 'Hero slides:', heroCount);
}

main()
  .catch((error: unknown) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });