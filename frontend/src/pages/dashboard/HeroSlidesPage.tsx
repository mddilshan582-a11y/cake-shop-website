import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listHeroSlides, deleteHeroSlide, setHeroSlideActive } from '../../api/heroSlides';
import type { HeroSlide } from '../../types';
import { absoluteUrl } from '../../utils/whatsapp';

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const reload = async () => {
    try {
      setSlides(await listHeroSlides());
    } catch (e) {
      setError((e as Error).message);
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  const toggle = async (s: HeroSlide) => {
    try {
      await setHeroSlideActive(s.id, !s.isActive);
      await reload();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const remove = async (s: HeroSlide) => {
    if (!window.confirm('Delete this hero slide?')) return;
    try {
      await deleteHeroSlide(s.id);
      await reload();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#3a2e2a' }}>Hero Slides</h2>
        <Link to="/dashboard/hero-slides/new" style={{ background: '#b4525a', color: '#fff', padding: '0.55rem 1.2rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>Add New Slide</Link>
      </div>
      {error && <p style={{ color: '#c0392b' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))', gap: '1rem', marginTop: '1.2rem' }}>
        {slides.map((s) => (
          <div key={s.id} style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ height: '9rem', background: '#f0e3d5', position: 'relative' }}>
              {s.imageUrl ? (
                <img src={absoluteUrl(s.imageUrl)} alt={s.title ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#a34a3f', fontFamily: 'Palatino, Georgia, serif' }}>No image (fallback)</div>
              )}
            </div>
            <div style={{ padding: '0.8rem 1rem' }}>
              <div style={{ fontWeight: 700 }}>{s.title || '(No title)'}</div>
              <div style={{ color: '#8a7b70', fontSize: '0.85rem', marginTop: '0.2rem' }}>Order: {s.displayOrder}</div>
              <div style={{ color: s.isActive ? '#1e7a34' : '#c0392b', fontSize: '0.85rem', marginTop: '0.2rem' }}>{s.isActive ? 'Active' : 'Inactive'}</div>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.7rem', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/dashboard/hero-slides/' + s.id + '/edit')} style={btn}>Edit</button>
                <button onClick={() => toggle(s)} style={btn}>{s.isActive ? 'Disable' : 'Enable'}</button>
                <button onClick={() => remove(s)} style={{ ...btn, color: '#c0392b' }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {slides.length === 0 && !error && <p style={{ color: '#8a7b70', marginTop: '1.5rem' }}>No hero slides yet. Add one to feature promotions on the homepage.</p>}
    </div>
  );
}

const btn: React.CSSProperties = { border: '1px solid #999', background: 'transparent', borderRadius: '5px', padding: '0.3rem 0.7rem', cursor: 'pointer', fontSize: '0.85rem' };