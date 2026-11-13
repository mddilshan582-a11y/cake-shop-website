import { useEffect, useState } from 'react';
import { fetchShopCakes } from '../../api/shop';
import type { Cake } from '../../types';
import CakeCard from '../../components/shop/CakeCard';
import { LoadingState, EmptyState, ErrorState } from '../../components/shop/ShopStates';
import { theme, pageTitleStyle, pageSubStyle, gridStyle } from '../../components/shop/theme';

export default function ShopBrowseCakesPage() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setCakes(await fetchShopCakes());
        setStatus('ready');
      } catch (e) {
        setStatus('error');
        setError((e as Error).message);
      }
    })();
  }, []);

  const q = search.trim().toLowerCase();
  const filtered = q ? cakes.filter((c) => c.name.toLowerCase().includes(q)) : cakes;

  return (
    <div>
      <div style={pageHead}>
        <h1 style={pageTitleStyle}>All Cakes</h1>
        <p style={pageSubStyle}>Browse our full collection of freshly baked cakes.</p>
      </div>

      <div style={{ position: 'relative', maxWidth: '24rem' }}>
        <span style={searchIco}>⌕</span>
        <input type="search" placeholder="Search cakes..." value={search} onChange={(e) => setSearch(e.target.value)} style={searchInput} />
      </div>

      {status === 'loading' && <LoadingState label="Loading cakes..." />}
      {status === 'error' && <ErrorState message={error} />}
      {status === 'ready' && (
        filtered.length ? (
          <div style={gridStyle()}>{filtered.map((c) => <CakeCard key={c.id} cake={c} />)}</div>
        ) : (
          <EmptyState message={q ? 'No cakes match your search.' : 'No cakes are available right now.'} />
        )
      )}
    </div>
  );
}

const pageHead: React.CSSProperties = { margin: 0 };
const searchInput: React.CSSProperties = { width: '100%', padding: '0.65rem 0.9rem 0.65rem 2.3rem', borderRadius: '999px', border: '1px solid ' + theme.line, background: '#fff', fontSize: '0.95rem', color: theme.ink };
const searchIco: React.CSSProperties = { position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: theme.muted, fontSize: '1rem', pointerEvents: 'none' };