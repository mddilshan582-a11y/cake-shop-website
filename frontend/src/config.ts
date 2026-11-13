// Centralized public configuration.
// Uses Vite env vars with safe development defaults.

export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';
export const APP_HOST = import.meta.env.VITE_APP_HOST ?? 'http://localhost:5173';
export const IMG_BASE = import.meta.env.VITE_IMG_BASE ?? 'http://localhost:5000';

// Central WhatsApp number (used everywhere, not hardcoded per component).
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? '911234567890';
export const SHOP_NAME = 'Smart Cake Shop';