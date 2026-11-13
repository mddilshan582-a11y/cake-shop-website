import { useEffect, useState } from 'react';
import { fetchCounterCakes } from '../../api/shop';
import type { Cake } from '../../types';
import CakeCard from '../../components/shop/CakeCard';
import { LoadingState, EmptyState, ErrorState } from '../../components/shop/ShopStates';
import { pageTitleStyle, pageSubStyle, gridStyle } from '../../components/shop/theme';

export default function ShopCounterCakesPage() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setCakes(await fetchCounterCakes());
        setStatus('ready');
      } catch (e) {
        setStatus('error');
        setError((e as Error).message);
      }
    })();
  }, []);

  return (
    <div>
      <h1 style={pageTitleStyle}>Counter Cakes</h1>
      <p style={pageSubStyle}>Cakes currently on our counter — ready to pick up today.</p>
      {status === 'loading' && <LoadingState label="Loading counter cakes..." />}
      {status === 'error' && <ErrorState message={error} />}
      {status === 'ready' && (
        cakes.length ? (
          <div style={{ ...gridStyle(), marginTop: '1.2rem' }}>{cakes.map((c) => <CakeCard key={c.id} cake={c} />)}</div>
        ) : (
          <EmptyState message="No counter cakes available right now." />
        )
      )}
    </div>
  );
}