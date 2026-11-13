// Central WhatsApp message builder + link helper.
import { WHATSAPP_NUMBER, IMG_BASE } from '../config';

export function absoluteUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return IMG_BASE + path;
}

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function orderMessage(cake: {
  name: string;
  category: { name: string } | null;
  pricing: { finalPriceFormatted: string; originalPriceFormatted: string; discountPercent: number };
  imageUrl: string | null;
  description: string | null;
}): string {
  const lines = [
    'Hello Smart Cake Shop!',
    '',
    'I want to order this cake:',
    '',
    `Cake: ${cake.name}`,
    `Category: ${cake.category?.name ?? 'Cake'}`,
    `Price: ${cake.pricing.finalPriceFormatted}`,
  ];
  if (cake.pricing.discountPercent > 0) {
    lines.push(`Original: ${cake.pricing.originalPriceFormatted} (${cake.pricing.discountPercent}% off)`);
  }
  if (cake.description) {
    lines.push(`Details: ${cake.description}`);
  }
  const img = absoluteUrl(cake.imageUrl ?? '');
  if (img) {
    lines.push('');
    lines.push(`Cake Image: ${img}`);
  }
  lines.push('');
  lines.push('Please help me with the order.');
  return lines.join('\n');
}

export function customCakeMessage(fields: {
  name: string;
  phone: string;
  occasion: string;
  flavor: string;
  size: string;
  date: string;
  requirements: string;
}): string {
  const lines = [
    'Hello Smart Cake Shop!',
    '',
    'I would like a customized cake.',
    '',
    `Name: ${fields.name}`,
    `Phone: ${fields.phone}`,
    `Occasion: ${fields.occasion}`,
    `Flavour: ${fields.flavor}`,
    `Size: ${fields.size}`,
    `Preferred Date: ${fields.date}`,
    '',
    'Special Requirements:',
    fields.requirements || 'None',
  ];
  lines.push('');
  lines.push('Please let me know the price and design options.');
  return lines.join('\n');
}