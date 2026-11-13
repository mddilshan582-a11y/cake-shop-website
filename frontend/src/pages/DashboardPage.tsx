import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listCategories } from '../api/categories';
import { listCakes } from '../api/cakes';

interface Stats {
  totalCakes: number;
  availableCakes: number;
  featuredCakes: number;
  counterCakes: number;
  totalCategories: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [cakes, cats] = await Promise.all([listCakes(), listCategories()]);
        if (!active) return;
        setStats({
          totalCakes: cakes.length,
          availableCakes: cakes.filter((c) => c.isAvailable).length,
          featuredCakes: cakes.filter((c) => c.isFeatured).length,
          counterCakes: cakes.filter((c) => c.isCounterCake).length,
          totalCategories: cats.length,
        });
      } catch (e) {
        if (active) setError((e as Error).message);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const cards = stats
    ? [
        { label: 'Total Cakes', value: stats.totalCakes },
        { label: 'Available Cakes', value: stats.availableCakes },
        { label: 'Featured Cakes', value: stats.featuredCakes },
        { label: 'Counter Cakes', value: stats.counterCakes },
        { label: 'Total Categories', value: stats.totalCategories },
      ]
    : [];

  return (
    <div>
      <h2 style={{ marginTop: 0, color: '#3a2e2a' }}>Dashboard</h2>
      {error && <p style={{ color: '#c0392b' }}>{error}</p>}
      {!stats && !error && <p>Loading counts...</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(13rem, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        {cards.map((c) => (
          <div key={c.label} style={{ background: '#fff', borderRadius: '10px', padding: '1.2rem 1.4rem', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#b4525a' }}>{c.value}</div>
            <div style={{ color: '#777', marginTop: '0.25rem' }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Link to="/dashboard/cakes" style={{ background: '#b4525a', color: '#fff', padding: '0.6rem 1.3rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Manage Cakes</Link>
        <Link to="/dashboard/categories" style={{ background: '#6b5b52', color: '#fff', padding: '0.6rem 1.3rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Manage Categories</Link>
      </div>
    </div>
  );
}