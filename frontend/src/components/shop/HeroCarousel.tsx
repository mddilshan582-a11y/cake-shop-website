import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { HeroSlide } from '../../types';
import { absoluteUrl } from '../../utils/whatsapp';

const AUTOPLAY_MS = 10000;

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchX = useRef<number | null>(null);
  const count = slides.length;
  const single = count === 1;

  useEffect(() => {
    // Reset index when slide list changes.
    setIndex(0);
  }, [count]);

  useEffect(() => {
    if (single || paused || count === 0) {
      if (timer.current) clearTimeout(timer.current);
      return;
    }
    timer.current = setTimeout(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, single, count]);

  const go = (next: number) => setIndex(((next % count) + count) % count);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  const onTouchStart = (x: number) => {
    touchX.current = x;
    setPaused(true);
  };
  const onTouchEnd = (x: number) => {
    const start = touchX.current;
    touchX.current = null;
    if (start !== null) {
      const diff = x - start;
      if (diff < -40) next();
      else if (diff > 40) prev();
    }
    setPaused(false);
  };

  if (count === 0 || slides.length === 0) {
    return <FallbackHero />;
  }

  const shift = `-${index * 100}%`;

  return (
    <section className="hero-carousel" aria-label="Featured cakes" onMouseEnter={single ? undefined : () => setPaused(true)} onMouseLeave={single ? undefined : () => setPaused(false)}>
      <div className="hero-slides">
        <div className="hero-track" style={{ transform: `translateX(${shift})` }}>
          {slides.map((s) => (
            <div className="hero-slide" key={s.id}>
              {s.imageUrl ? (
                <div className="hero-slide-bg">
                  <img src={absoluteUrl(s.imageUrl)} alt={s.title ?? 'Cake promotion'} />
                </div>
              ) : (
                <div className="hero-slide-fallback"><span className="hero-orn">🍰</span></div>
              )}
              <div className="hero-slide-shade" />
              <div className="hero-slide-content">
                {s.title ? <h2 className="hero-slide-title">{s.title}</h2> : null}
                {s.subtitle ? <p className="hero-slide-sub">{s.subtitle}</p> : null}
                {s.buttonText && s.buttonLink ? (
                  <div className="hero-slide-btn">
                    {s.buttonLink.startsWith('/') ? (
                      <Link className="shop-cta-link--on-dark" to={s.buttonLink}>{s.buttonText} <span className="cta-arrow">→</span></Link>
                    ) : (
                      <a className="shop-cta-link--on-dark" href={s.buttonLink} target="_blank" rel="noopener noreferrer">{s.buttonText} <span className="cta-arrow">→</span></a>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!single && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button className="hero-arrow hero-arrow-prev" onClick={prev} aria-label="Previous slide" onTouchStart={(e) => onTouchStart(e.touches[0].clientX)} onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}>‹</button>
          <button className="hero-arrow hero-arrow-next" onClick={next} aria-label="Next slide" onTouchStart={(e) => onTouchStart(e.touches[0].clientX)} onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}>›</button>
        </div>
      )}

      <div className="hero-dots" style={{ display: !single ? 'flex' : 'none' }}>
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={'hero-dot' + (i === index ? ' hero-dot-active' : '')}
            onClick={() => { setPaused(true); setIndex(i); }}
            aria-label={'Go to slide ' + (i + 1)}
          />
        ))}
      </div>
    </section>
  );
}

function FallbackHero() {
  return (
    <section className="hero" style={{ padding: '3rem 2.4rem' }}>
      <div>
        <div style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.72rem', color: '#f2dcc6' }}>Smart Cake Shop · Baked with love</div>
        <h1 className="hero-title" style={{ fontFamily: 'Palatino, Georgia, serif', fontWeight: 700, color: '#fffdfb', lineHeight: 1.12, margin: '0.7rem 0 0.5rem' }}>Fresh Cakes for Every Celebration</h1>
        <p style={{ fontSize: '1.08rem', color: '#f6eadf', maxWidth: '30rem', margin: 0 }}>Handcrafted, delicious cakes baked fresh.</p>
        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.4rem', flexWrap: 'wrap' }}>
          <Link className="shop-cta-link--on-dark" to="/shop/cakes">Explore Cakes <span className="cta-arrow">→</span></Link>
          <Link className="shop-cta-link--on-dark" to="/shop/customized-cake">Customize Your Cake <span className="cta-arrow">→</span></Link>
        </div>
      </div>
    </section>
  );
}