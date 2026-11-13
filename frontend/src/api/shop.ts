import { api } from './client';
import type { Cake, CategoryWithCount, HeroSlide } from '../types';

// Public shop API - no auth headers required.

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  return api.request<HeroSlide[]>('/shop/hero-slides');
}

export async function fetchShopCategories(): Promise<CategoryWithCount[]> {
  return api.request<CategoryWithCount[]>('/shop/categories');
}

export async function fetchShopCakes(opts?: { categoryId?: number; featured?: boolean; counter?: boolean }): Promise<Cake[]> {
  const params = new URLSearchParams();
  if (opts?.categoryId) params.set('categoryId', String(opts.categoryId));
  if (opts?.featured !== undefined) params.set('featured', String(opts.featured));
  if (opts?.counter !== undefined) params.set('counter', String(opts.counter));
  const qs = params.toString();
  return api.request<Cake[]>('/shop/cakes' + (qs ? '?' + qs : ''));
}

export async function fetchFeaturedCakes(): Promise<Cake[]> {
  return api.request<Cake[]>('/shop/cakes/featured');
}

export async function fetchCounterCakes(): Promise<Cake[]> {
  return api.request<Cake[]>('/shop/cakes/counter');
}

export async function fetchCategoryCakes(categoryId: number): Promise<Cake[]> {
  return api.request<Cake[]>('/shop/categories/' + categoryId + '/cakes');
}

export async function fetchShopCake(id: number): Promise<Cake> {
  return api.request<Cake>('/shop/cakes/' + id);
}