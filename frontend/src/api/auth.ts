import { api } from './client';
import type { LoginResponse, User } from '../types/auth';

export async function login(credentials: { username: string; password: string }): Promise<LoginResponse> {
  return api.request<LoginResponse>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
}

export async function fetchMe(): Promise<User> {
  return api.request<User>('/auth/me', {
    headers: api.authHeaders(),
  });
}