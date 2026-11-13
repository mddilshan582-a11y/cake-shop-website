import { Link } from 'react-router-dom';
import type { Cake } from '../../types';
import { absoluteUrl } from '../../utils/whatsapp';
import { buildWhatsAppLink, orderMessage } from '../../utils/whatsapp';
import { theme } from './theme';

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join('')
    .toUpperCase();
}

export default function CakeCard({ cake }: { cake: Cake }) {
  const img = cake.imageUrl ? absoluteUrl(cake.imageUrl) : null;
  const wa = buildWhatsAppLink(orderMessage(cake));

  return (
    <div className="cake-card">
      <div style={media}>
        {img ? (
          <img src={img} alt={cake.name} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        ) : null}
        {!img && (
          <div className="media-fallback">
            <span className="word">{initials(cake.name)}</span>
          </div>
        )}
        {!img && img === null && null}
        {cake.pricing.hasDiscount ? (
          <span style={badge}>{cake.pricing.discountPercent}% OFF</span>
        ) : null}
      </div>

      <div style={body}>
        <div style={cat}>{cake.category?.name ?? 'Cake'}</div>
        <h3 style={name}>{cake.name}</h3>
        <div style={priceRow}>
          {cake.pricing.hasDiscount && (
            <span style={orig}>{cake.pricing.originalPriceFormatted}</span>
          )}
          <span style={final}>{cake.pricing.finalPriceFormatted}</span>
        </div>
        <div style={actions}>
          <Link to={'/shop/cakes/' + cake.id} className="shop-cta-link">View Details</Link>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="shop-cta-link">Order Now</a>
        </div>
      </div>
    </div>
  );
}

const media: React.CSSProperties = { position: 'relative', aspectRatio: '4 / 3', background: '#eee2d6', overflow: 'hidden' };
const badge: React.CSSProperties = {
  position: 'absolute', top: '0.7rem', right: '0.7rem', zIndex: 2,
  background: theme.discBg, color: theme.discInk, fontWeight: 800, fontSize: '0.78rem',
  padding: '0.24rem 0.6rem', borderRadius: '999px', boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
};
const body: React.CSSProperties = { padding: '0.95rem 1.05rem 1.05rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' };
const cat: React.CSSProperties = { fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.09em', color: theme.muted };
const name: React.CSSProperties = { fontFamily: theme.serif, fontSize: '1.12rem', fontWeight: 700, color: theme.ink, lineHeight: 1.25, margin: 0 };
const priceRow: React.CSSProperties = { display: 'flex', alignItems: 'baseline', gap: '0.45rem', flexWrap: 'wrap' };
const orig: React.CSSProperties = { color: theme.muted, textDecoration: 'line-through', fontSize: '0.9rem' };
const final: React.CSSProperties = { fontSize: '1.35rem', fontWeight: 800, color: theme.gold };
const actions: React.CSSProperties = { display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.3rem' };