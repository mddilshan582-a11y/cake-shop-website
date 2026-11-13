import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCategoryCakes, fetchShopCategories } from '../../api/shop';
import type { Cake } from '../../types';
import CakeCard from '../../components/shop/CakeCard';
import CategoryCustomizeCTA from '../../components/shop/CategoryCustomizeCTA';
import { LoadingState, EmptyState, ErrorState } from '../../components/shop/ShopStates';
import { theme, pageTitleStyle, gridStyle } from '../../components/shop/theme';

const INITIAL_LIMIT = 4;

export default function ShopCategoryCakesPage() {
  const { id } = useParams();
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [label, setLabel] = useState('Cakes');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'missing'>('loading');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setStatus('loading');
    setShowAll(false);
    (async () => {
      try {
        const list = await fetchCategoryCakes(Number(id));
        setCakes(list);
        // Category name comes from the first cake; for empty categories fall back to the
        // public categories list so the heading/customize text stays category-specific.
        let name = list[0]?.category?.name;
        if (!name) {
          try {
            const cats = await fetchShopCategories();
            name = cats.find((c) => c.id === Number(id))?.name;
          } catch {
            /* non-fatal: keep generic label */
          }
        }
        setLabel(name ?? 'Cakes');
        setStatus('ready');
      } catch (e) {
        setStatus((e as Error).message === 'Category not found' ? 'missing' : 'error');
      }
    })();
  }, [id]);

  const hasMore = cakes.length > INITIAL_LIMIT;
  const visibleCakes = showAll ? cakes : cakes.slice(0, INITIAL_LIMIT);
  // Promotional website image for the Customize band: first available cake photo in this category.
  const promoImage = cakes.find((c) => c.imageUrl)?.imageUrl ?? null;

  return (
    <div>
      <Link to="/shop/categories" className="shop-cta-link back-inline">← All categories</Link>
      <div style={{ marginTop: '0.6rem' }}>
        <h1 style={pageTitleStyle}>{label}</h1>
        <p style={{ color: theme.body, margin: '0.3rem 0 1.2rem' }}>{cakes.length} cakes available</p>
      </div>
      {status === 'loading' && <LoadingState label="Loading cakes..." />}
      {status === 'error' && <ErrorState message="We could not load this category. Please try again." />}
      {status === 'missing' && (
        <div>
          <ErrorState message="This category is not available." />
          <p style={{ textAlign: 'center' }}><Link to="/shop/categories" className="shop-cta-link">Browse categories <span className="cta-arrow">→</span></Link></p>
        </div>
      )}
      {status === 'ready' && (
        <div>
          {cakes.length ? (
            <>
              <div style={gridStyle()}>{visibleCakes.map((c) => <CakeCard key={c.id} cake={c} />)}</div>
              {hasMore && !showAll && (
                <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
                  <button type="button" onClick={() => setShowAll(true)} className="shop-cta-link" style={viewMoreBtn} aria-expanded={showAll}>
                    View More <span className="cta-arrow">→</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState message="No cakes are currently available in this category." />
          )}
          <div style={{ marginTop: cakes.length ? '2.4rem' : 0 }}>
            <CategoryCustomizeCTA name={label} image={promoImage} />
          </div>
        </div>
      )}
    </div>
  );
}

// View More is a text CTA button styled like the premium link; reset default button chrome.
const viewMoreBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: '0.5rem 0.4rem',
  cursor: 'pointer',
  font: 'inherit',
  lineHeight: 'inherit',
};