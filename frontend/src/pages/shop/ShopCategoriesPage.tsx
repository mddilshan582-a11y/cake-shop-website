import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchShopCategories } from '../../api/shop';
import { absoluteUrl } from '../../utils/whatsapp';
import type { CategoryWithCount } from '../../types';
import { LoadingState, EmptyState, ErrorState } from '../../components/shop/ShopStates';
import { theme, pageTitleStyle, pageSubStyle } from '../../components/shop/theme';

const absoluteUrlShop = absoluteUrl;
const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');

export default function ShopCategoriesPage() {
  const [cats, setCats] = useState<CategoryWithCount[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setCats(await fetchShopCategories());
        setStatus('ready');
      } catch (e) {
        setStatus('error');
        setError((e as Error).message);
      }
    })();
  }, []);

  return (
    <div>
      <h1 style={pageTitleStyle}>Cake Categories</h1>
      <p style={pageSubStyle}>Explore cakes by occasion and style.</p>
      {status === 'loading' && <LoadingState label="Loading categories..." />}
      {status === 'error' && <ErrorState message={error} />}
      {status === 'ready' && (
        cats.length ? (
          <div style={catGrid}>
            {cats.map((c) => {
              const tone = tones[c.id % tones.length];
              return (
                <Link key={c.id} to={'/shop/categories/' + c.id} className="cat-card" style={{ background: 'linear-gradient(150deg,' + tone + '2e, #efe0cd 170%)' }}>
                  {c.imageUrl ? (
                    <div style={imgWrap}>
                      <img src={absoluteUrlShop(c.imageUrl)} alt={c.name} style={imgStyle} />
                    </div>
                  ) : (
                    <div style={badgeStyle}>
                      <span style={{ fontFamily: theme.serif, fontSize: '2.2rem', fontWeight: 700, color: tone }}>{initials(c.name)}</span>
                    </div>
                  )}
                  <span style={catName}>{c.name}</span>
                  {c.description && <span style={catDesc}>{c.description}</span>}
                  <span style={catMeta}><b style={{ color: tone }}>{c._count?.cakes ?? 0}</b> cakes</span>
                  <span style={{ ...catArrow, color: tone }}>Explore →</span>
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyState message="No categories available right now." />
        )
      )}
    </div>
  );
}

const tones = ['#a34a3f', '#8a5a3b', '#7c5d3a', '#9a6f42', '#8c5a4a', '#a9723f'];
const catGrid: React.CSSProperties = { display: 'grid', gap: '1.4rem', gridTemplateColumns: 'repeat(auto-fill, minmax(16.5rem, 1fr))' };
const imgWrap: React.CSSProperties = { width: '100%', height: '9rem', overflow: 'hidden', borderRadius: '8px', marginBottom: '0.7rem' };
const imgStyle: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
const badgeStyle: React.CSSProperties = { width: '100%', height: '9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', marginBottom: '0.7rem', background: 'rgba(255,255,255,0.45)' };
const catName: React.CSSProperties = { fontFamily: theme.serif, fontSize: '1.3rem', fontWeight: 700, color: theme.ink };
const catDesc: React.CSSProperties = { fontSize: '0.88rem', color: theme.muted, marginTop: '0.2rem', lineHeight: 1.5 };
const catMeta: React.CSSProperties = { fontSize: '0.85rem', color: theme.muted, marginTop: '0.6rem' };
const catArrow: React.CSSProperties = { marginTop: '0.5rem', fontWeight: 600, fontSize: '0.92rem' };