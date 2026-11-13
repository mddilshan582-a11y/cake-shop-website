import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listCakes, setCakeAvailability, setCakeFeatured, setCakeCounter } from '../../api/cakes';
import type { Cake } from '../../types';

const IMG_BASE = 'http://localhost:5000';

export default function CakesPage() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [error, setError] = useState('');

  const reload = async () => {
    try {
      setCakes(await listCakes());
    } catch (e) {
      setError((e as Error).message);
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  const runAction = async (fn: () => Promise<unknown>) => {
    try {
      await fn();
      await reload();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#3a2e2a' }}>Cakes</h2>
        <Link to="/dashboard/cakes/new" style={{ background: '#b4525a', color: '#fff', padding: '0.55rem 1.2rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Add Cake</Link>
      </div>
      {error && <p style={{ color: '#c0392b' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))', gap: '1rem', marginTop: '1.2rem' }}>
        {cakes.map((cake) => (
          <div key={cake.id} style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            {cake.imageUrl ? (
              <img src={IMG_BASE + cake.imageUrl} alt={cake.name} style={{ width: '100%', height: '10rem', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '10rem', background: '#eee3da', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b9a79a' }}>No image</div>
            )}
            <div style={{ padding: '0.9rem 1.1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{cake.name}</div>
              <div style={{ color: '#8a7b70', fontSize: '0.9rem' }}>{cake.category?.name ?? 'Uncategorized'}</div>
              <div style={{ margin: '0.5rem 0' }}>
                <span style={{ color: '#888', textDecoration: 'line-through' }}>{cake.pricing.originalPriceFormatted}</span>
                {cake.pricing.hasDiscount && <span style={{ background: '#fdeaea', color: '#c0392b', borderRadius: '4px', padding: '0.05rem 0.4rem', fontSize: '0.8rem', marginLeft: '0.4rem' }}>{cake.pricing.discountPercent}% off</span>}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#b4525a' }}>{cake.pricing.finalPriceFormatted}</div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#6b5b52' }}>
                <span style={{ marginRight: '0.75rem', color: cake.isFeatured ? '#b4525a' : '#aaa' }}>{cake.isFeatured ? '★ Featured' : 'Not featured'}</span>
                <span style={{ marginRight: '0.75rem', color: cake.isCounterCake ? '#b4525a' : '#aaa' }}>{cake.isCounterCake ? 'Counter' : 'Not counter'}</span>
                <span style={{ color: cake.isAvailable ? '#1e7a34' : '#c0392b' }}>{cake.isAvailable ? 'Available' : 'Unavailable'}</span>
              </div>
              <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <Link to={'/dashboard/cakes/' + cake.id + '/edit'} style={{ border: '1px solid #999', background: 'transparent', borderRadius: '5px', padding: '0.3rem 0.7rem', textDecoration: 'none', color: '#333' }}>Edit</Link>
                <button onClick={() => runAction(() => setCakeAvailability(cake.id, !cake.isAvailable))} style={{ border: '1px solid #999', background: 'transparent', borderRadius: '5px', padding: '0.3rem 0.7rem', cursor: 'pointer' }}>{cake.isAvailable ? 'Make Unavailable' : 'Make Available'}</button>
                <button onClick={() => runAction(() => setCakeFeatured(cake.id, !cake.isFeatured))} style={{ border: '1px solid #999', background: 'transparent', borderRadius: '5px', padding: '0.3rem 0.7rem', cursor: 'pointer' }}>{cake.isFeatured ? 'Unfeature' : 'Feature'}</button>
                <button onClick={() => runAction(() => setCakeCounter(cake.id, !cake.isCounterCake))} style={{ border: '1px solid #999', background: 'transparent', borderRadius: '5px', padding: '0.3rem 0.7rem', cursor: 'pointer' }}>{cake.isCounterCake ? 'Remove Counter' : 'Set Counter'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}