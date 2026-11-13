import { api, authHeaders } from './client';
import type { HeroSlide } from '../types';

export async function listHeroSlides(): Promise<HeroSlide[]> {
  return api.request<HeroSlide[]>('/hero-slides', { headers: authHeaders() });
}

export async function createHeroSlide(formData: FormData): Promise<HeroSlide> {
  return api.request<HeroSlide>('/hero-slides', {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
}

export async function updateHeroSlide(id: number, formData: FormData): Promise<HeroSlide> {
  return api.request<HeroSlide>('/hero-slides/' + id, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });
}

export async function setHeroSlideActive(id: number, isActive: boolean): Promise<HeroSlide> {
  return api.request<HeroSlide>('/hero-slides/' + id + '/status', {
    method: 'PATCH',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive }),
  });
}

export async function deleteHeroSlide(id: number): Promise<void> {
  await api.request<unknown>('/hero-slides/' + id, { method: 'DELETE', headers: authHeaders() });
}