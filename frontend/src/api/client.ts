const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(API_BASE_URL + path, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { message?: string }).message ?? 'Request failed');
  }
  return (await res.json()) as T;
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function setToken(token: string): void {
  localStorage.setItem('token', token);
}

export function clearToken(): void {
  localStorage.removeItem('token');
}

export function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: 'Bearer ' + token } : {};
}

export const api = { request, getToken, setToken, clearToken, authHeaders };
export default API_BASE_URL;