import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff7f2', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.6rem', color: '#b4525a', marginBottom: '0.5rem' }}>Smart Cake Shop</h1>
      <p style={{ color: '#555', fontSize: '1.1rem', maxWidth: '30rem', textAlign: 'center' }}>
        Fresh, delicious cakes baked with care. Welcome to Smart Cake Shop.
      </p>
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          to="/shop"
          style={{ padding: '0.7rem 2.2rem', background: '#b4525a', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Visit Cake Shop
        </Link>
        <Link
          to="/login"
          style={{ padding: '0.7rem 2.2rem', background: '#6b5b52', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Staff Login
        </Link>
      </div>
    </div>
  );
}