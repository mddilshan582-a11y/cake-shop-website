/**
 * Centralized pricing utilities.
 * Money is stored in paise. All display formatting happens here.
 */

export interface CakePricing {
  originalPrice: number;
  discountPercent: number;
  finalPrice: number;
  originalPriceFormatted: string;
  finalPriceFormatted: string;
  hasDiscount: boolean;
}

export function computeFinalPaise(originalPricePaise: number, discountPercent: number): number {
  const discounted = originalPricePaise * (discountPercent / 100);
  return Math.round(originalPricePaise - discounted);
}

export function formatPrice(paise: number): string {
  const rupees = paise / 100;
  const formatted = rupees.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatted.replace(/\.?00$/, '');
}

export function toPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

export function buildPricing(originalPricePaise: number, discountPercent: number): CakePricing {
  const finalPrice = computeFinalPaise(originalPricePaise, discountPercent);
  return {
    originalPrice: originalPricePaise,
    discountPercent: discountPercent,
    finalPrice: finalPrice,
    originalPriceFormatted: formatPrice(originalPricePaise),
    finalPriceFormatted: formatPrice(finalPrice),
    hasDiscount: discountPercent > 0,
  };
}