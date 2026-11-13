import { api, authHeaders } from '../api/client';
import type { Category, CategoryWithCount } from '../types';

export async function listCategories(): Promise<CategoryWithCount[]> {
  return api.request<CategoryWithCount[]>('/categories', { headers: authHeaders() });
}

export async function getCategory(id: number): Promise<CategoryWithCount> {
  return api.request<CategoryWithCount>('/categories/' + id, { headers: authHeaders() });
}

export async function createCategory(input: { name: string; description?: string | null; image?: File | null }): Promise<Category> {
  const fd = new FormData();
  fd.append('name', input.name);
  fd.append('description', input.description ?? '');
  if (input.image) fd.append('image', input.image);
  return api.request<Category>('/categories', { method: 'POST', headers: authHeaders(), body: fd });
}

export async function updateCategory(id: number, input: { name?: string; description?: string | null; image?: File | null; keepImage?: boolean }): Promise<Category> {
  const fd = new FormData();
  if (input.name !== undefined) fd.append('name', input.name);
  if (input.description !== undefined) fd.append('description', input.description ?? '');
  // Preserve existing image unless a new one is chosen or cleared.
  if (input.image) fd.append('image', input.image);
  else if (input.keepImage === false) fd.append('imageUrl', '');
  return api.request<Category>('/categories/' + id, { method: 'PUT', headers: authHeaders(), body: fd });
}

export async function setCategoryActive(id: number, isActive: boolean): Promise<Category> {
  return api.request<Category>('/categories/' + id + '/status', {
    method: 'PATCH',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive }),
  });
}