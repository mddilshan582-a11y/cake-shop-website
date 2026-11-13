import { api, authHeaders } from '../api/client';
import type { Cake } from '../types';

export interface CakeQuery {
  categoryId?: number;
  featured?: boolean;
  counter?: boolean;
  available?: boolean;
}

export async function listCakes(query?: CakeQuery): Promise<Cake[]> {
  const params = new URLSearchParams();
  if (query?.categoryId) params.set('categoryId', String(query.categoryId));
  if (query?.featured !== undefined) params.set('featured', String(query.featured));
  if (query?.counter !== undefined) params.set('counter', String(query.counter));
  if (query?.available !== undefined) params.set('available', String(query.available));
  const qs = params.toString();
  return api.request<Cake[]>('/cakes' + (qs ? '?' + qs : ''), { headers: authHeaders() });
}

export async function getCake(id: number): Promise<Cake> {
  return api.request<Cake>('/cakes/' + id, { headers: authHeaders() });
}

export async function createCakeForm(formData: FormData): Promise<Cake> {
  return api.request<Cake>('/cakes', {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
}

export async function updateCakeForm(id: number, formData: FormData): Promise<Cake> {
  return api.request<Cake>('/cakes/' + id, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });
}

async function patchBool(path: string, field: string, value: boolean): Promise<Cake> {
  return api.request<Cake>(path, {
    method: 'PATCH',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ [field]: value }),
  });
}

export function setCakeAvailability(id: number, value: boolean): Promise<Cake> {
  return patchBool('/cakes/' + id + '/availability', 'isAvailable', value);
}
export function setCakeFeatured(id: number, value: boolean): Promise<Cake> {
  return patchBool('/cakes/' + id + '/featured', 'isFeatured', value);
}
export function setCakeCounter(id: number, value: boolean): Promise<Cake> {
  return patchBool('/cakes/' + id + '/counter', 'isCounterCake', value);
}

/** Centralized rupee -> paise + preview for the frontend. */
export function pricePreviewRupees(rupees: number, discountPercent: number) {
  const paise = Math.round(rupees * 100);
  const finalPaise = Math.round(paise * (1 - discountPercent / 100));
  return { rupees, discountPercent, finalPaise, finalRupees: finalPaise / 100 };
}