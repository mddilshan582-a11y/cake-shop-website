import type { CSSProperties } from 'react';

// Centralized customer-site design tokens.
export const theme = {
  bg: '#faf6f1',
  bg2: '#f3ece2',
  surface: '#fffdfb',
  ink: '#372b22',
  body: '#6b5f53',
  muted: '#98897a',
  accent: '#a34a3f',
  accentDeep: '#7c352e',
  gold: '#c8963f',
  line: '#e7dcd1',
  discBg: '#f7e4dc',
  discInk: '#b03a2c',
  whatsapp: '#1fa855',
  whatsappDeep: '#179349',
  lightWarm: '#f2e4d7',
  serif: 'Palatino, Georgia, "Times New Roman", serif',
  sans: '"Segoe UI", system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif',
} as const;

export const fontSerif = theme.serif;

// Buttons
const btnBase: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.45rem',
  padding: '0.68rem 1.35rem',
  borderRadius: '999px',
  fontWeight: 600,
  fontSize: '0.95rem',
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
  transition: 'transform 0.16s ease, box-shadow 0.18s ease, background 0.18s ease',
};
export const btnPrimary: CSSProperties = { ...btnBase, background: theme.accent, color: '#fff' };
export const btnWhatsapp: CSSProperties = { ...btnBase, background: theme.whatsapp, color: '#fff' };
export const btnOutline: CSSProperties = { ...btnBase, background: 'transparent', color: theme.accent, boxShadow: 'inset 0 0 0 1.5px ' + theme.accent };
export const btnGhost: CSSProperties = { ...btnBase, background: 'transparent', color: '#fffdfb', boxShadow: 'inset 0 0 0 1.5px #fffdfb' };

// Card
export const cardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  background: theme.surface,
  borderRadius: '1rem',
  overflow: 'hidden',
  boxShadow: '0 12px 24px rgba(70,48,34,0.10), 0 2px 6px rgba(70,48,34,0.06)',
  transition: 'transform 0.2s ease, box-shadow 0.22s ease',
};
export const mediaStyle: CSSProperties = { position: 'relative', aspectRatio: '4 / 3', background: '#eee2d6', overflow: 'hidden' };
export const sectionHeadStyle: CSSProperties = { margin: '2.8rem 0 1.1rem' };
export const eyebrowStyle: CSSProperties = { textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.72rem', fontWeight: 700, color: theme.gold };
export const headLineStyle: CSSProperties = { fontFamily: theme.serif, fontSize: '1.8rem', fontWeight: 700, color: theme.ink, margin: '0.2rem 0 0' };
export const subStyle: CSSProperties = { color: theme.body, margin: '0.4rem 0 0', fontSize: '0.98rem', maxWidth: '44rem' };

// Grids
export const gridStyle = (min = '15.5rem'): CSSProperties => ({ display: 'grid', gap: '1.6rem', gridTemplateColumns: 'repeat(auto-fill, minmax(' + min + ', 1fr))' });

// Page header
export const pageTitleStyle: CSSProperties = { fontFamily: theme.serif, fontSize: '1.85rem', fontWeight: 700, color: theme.ink, margin: 0 };
export const pageSubStyle: CSSProperties = { color: theme.body, margin: '0.3rem 0 0' };