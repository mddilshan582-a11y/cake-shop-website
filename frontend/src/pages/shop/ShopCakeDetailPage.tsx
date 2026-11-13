import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchShopCake } from '../../api/shop';
import type { Cake } from '../../types';
import { absoluteUrl, buildWhatsAppLink, orderMessage } from '../../utils/whatsapp';
import { LoadingState, ErrorState } from '../../components/shop/ShopStates';
import { theme } from '../../components/shop/theme';

function initials(name: string): string {
  return name.split(' ').slice(0, 2).map((w) => w.charAt(0)).join('').toUpperCase();
}

export default function ShopCakeDetailPage() {
  const { id } = useParams();
  const [cake, setCake] = useState<Cake | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'missing'>('loading');

  useEffect(() => {
    (async () => {
      try {
        const c = await fetchShopCake(Number(id));
        setCake(c);
        setStatus('ready');
      } catch (e) {
        setStatus((e as Error).message === 'Cake not found' ? 'missing' : 'error');
      }
    })();
  }, [id]);

  if (status === 'loading') return <LoadingState label="Loading cake..." />;
  if (status === 'error') return <ErrorState message="We could not load this cake. Please try again." />;
  if (status === 'missing' || !cake) {
    return (
      <div>
        <ErrorState message="This cake is not available." />
        <p style={{ textAlign: 'center' }}><Link to="/shop" className="shop-cta-link">Browse more cakes <span className="cta-arrow">→</span></Link></p>
      </div>
    );
  }

  const img = cake.imageUrl ? absoluteUrl(cake.imageUrl) : null;
  const wa = buildWhatsAppLink(orderMessage(cake));

  return (
    <div>
      <Link to="/shop" className="shop-cta-link back-inline">← Back to shop</Link>
      <div className="detail-card" style={grid}>
        {/* Media */}
        <div style={mediaCol}>
          <div style={{ position: 'relative', height: '100%' }}>
            {img ? (
              <img src={img} alt={cake.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div className="media-fallback" style={{ position: 'absolute', inset: 0 }}>
                <span className="word" style={{ fontSize: '3rem' }}>{initials(cake.name)}</span>
              </div>
            )}
            {cake.pricing.hasDiscount && (
              <span style={badge}>{cake.pricing.discountPercent}% OFF</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div style={infoCol}>
          <div style={cat}>{cake.category?.name ?? 'Cake'}</div>
          <h1 style={name}>{cake.name}</h1>
          {cake.description && <p style={desc}>{cake.description}</p>}

          <div style={priceBlock}>
            {cake.pricing.hasDiscount && <span style={orig}>{cake.pricing.originalPriceFormatted}</span>}
            <div style={final}>{cake.pricing.finalPriceFormatted}</div>
          </div>

          <div style={avail(cake.isAvailable)}>{cake.isAvailable ? 'Available' : 'Currently unavailable'}</div>

          <div style={actions}>
            <a className="shop-cta-link" href={wa} target="_blank" rel="noopener noreferrer">Order Now on WhatsApp <span className="cta-arrow">→</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}

const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))', overflow: 'hidden' };
const mediaCol: React.CSSProperties = { minHeight: '20rem', background: '#eee2d6' };
const infoCol: React.CSSProperties = { padding: '1.8rem 2rem', display: 'flex', flexDirection: 'column' };
const cat: React.CSSProperties = { textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.8rem', color: theme.muted, fontWeight: 700 };
const name: React.CSSProperties = { fontFamily: theme.serif, fontSize: '2rem', fontWeight: 700, color: theme.ink, margin: '0.4rem 0 0.5rem' };
const desc: React.CSSProperties = { color: theme.body, lineHeight: 1.7, margin: 0 };
const priceBlock: React.CSSProperties = { marginTop: '1.4rem' };
const orig: React.CSSProperties = { color: theme.muted, textDecoration: 'line-through', fontSize: '1.05rem' };
const final: React.CSSProperties = { fontFamily: theme.serif, fontSize: '2.1rem', fontWeight: 800, color: theme.gold };
const badge: React.CSSProperties = { position: 'absolute', top: '1rem', right: '1rem', background: theme.discBg, color: theme.discInk, fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '999px' };
const avail = (ok: boolean): React.CSSProperties => ({ marginTop: '1rem', color: ok ? '#3f7d45' : theme.discInk, fontWeight: 600 });
const actions: React.CSSProperties = { marginTop: '1.5rem' };