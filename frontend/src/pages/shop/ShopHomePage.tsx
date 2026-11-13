import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFeaturedCakes, fetchCounterCakes, fetchShopCategories, fetchShopCakes, fetchHeroSlides } from '../../api/shop';
import type { Cake, CategoryWithCount, HeroSlide } from '../../types';
import CakeCard from '../../components/shop/CakeCard';
import Section from '../../components/shop/Section';
import HeroCarousel from '../../components/shop/HeroCarousel';
import { LoadingState, EmptyState, ErrorState } from '../../components/shop/ShopStates';
import { theme, gridStyle } from '../../components/shop/theme';
import { absoluteUrl } from '../../utils/whatsapp';

function firstImage(cakes: Cake[]): string | null {
  const withImg = cakes.find((c) => c.imageUrl);
  return withImg ? withImg.imageUrl : null;
}

function initials(name: string): string {
  return name.split(' ').slice(0, 2).map((w) => w.charAt(0)).join('').toUpperCase();
}

export default function ShopHomePage() {
  const [featured, setFeatured] = useState<Cake[]>([]);
  const [counter, setCounter] = useState<Cake[]>([]);
  const [cats, setCats] = useState<CategoryWithCount[]>([]);
  const [allCakes, setAllCakes] = useState<Cake[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [f, c, k, all, hr] = await Promise.all([
          fetchFeaturedCakes(),
          fetchCounterCakes(),
          fetchShopCategories(),
          fetchShopCakes(),
          fetchHeroSlides(),
        ]);
        setFeatured(f);
        setCounter(c);
        setCats(k);
        setAllCakes(all);
        setHeroSlides(hr);
        setStatus('ready');
      } catch (e) {
        setStatus('error');
        setError((e as Error).message);
      }
    })();
  }, []);

  if (status === 'loading') return <LoadingState label="Loading cakes..." />;
  if (status === 'error') return <ErrorState message={error} />;

  // Representative image per category: category imageUrl first, else first cake image.
  const catImage = (c: CategoryWithCount): string | null => {
    if (c.imageUrl) return c.imageUrl;
    return firstImage(allCakes.filter((ck) => ck.categoryId === c.id));
  };

  // Custom cake CTA image: first available image from featured/counter/all.
  const customImage = firstImage(featured) ?? firstImage(counter) ?? firstImage(allCakes);

  return (
    <div>
      <HeroCarousel slides={heroSlides} />

      <Section eyebrow="Most loved" title="Trending Cakes" sub="Our most popular creations, loved by customers." id="trending" />
      {featured.length ? (
        <div style={gridStyle()}>{featured.map((c) => <CakeCard key={c.id} cake={c} />)}</div>
      ) : (
        <EmptyState message="No trending cakes available right now." />
      )}

      <Section eyebrow="Ready to pick up" title="Counter Cakes" sub="Fresh from today's counter — available right now." />
      {counter.length ? (
        <div style={gridStyle()}>{counter.slice(0, 4).map((c) => <CakeCard key={c.id} cake={c} />)}</div>
      ) : (
        <EmptyState message="No counter cakes available right now." />
      )}
      {counter.length > 4 && (
        <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
          <Link to="/shop/counter-cakes" className="shop-cta-link">View all counter cakes <span className="cta-arrow">→</span></Link>
        </div>
      )}

      {/* Categories */}
      <div className="section-head-center">
        <div className="head-eyebrow">Browse by type</div>
        <h2>Explore Our Collection</h2>
        <p>Find the perfect cake for every celebration.</p>
      </div>
      {cats.length ? (
        <div className="cat-grid">
          {cats.map((c) => <CategoryCard key={c.id} category={c} image={catImage(c)} />)}
        </div>
      ) : (
        <EmptyState message="No categories available right now." />
      )}

      {/* Customized Cake CTA */}
      <section className="custom-band">
        <div className="custom-media">
          {customImage ? (
            <img src={absoluteUrl(customImage)} alt="Customized cake" />
          ) : (
            <div className="custom-media-fallback">Custom Cakes</div>
          )}
          <div className="custom-media-deco" />
        </div>
        <div className="custom-band-top">
          <div className="cb-eyebrow">Made just for you</div>
          <h2>Create a Cake as Unique as Your Celebration</h2>
          <p>Tell us your occasion, flavour, size and design idea. Our team will help bring your vision to life.</p>
          <Link className="shop-cta-link custom-cta-link" to="/shop/customized-cake">Customize Your Cake <span className="cta-arrow">→</span></Link>
        </div>
      </section>

      {/* About */}
      <Section eyebrow="About us" title="About Smart Cake Shop" />
      <div className="about" style={about}>
        <p style={aboutText}>
          From birthday surprises to wedding centrepieces, we craft fresh cakes for every celebration. Browse our collection and order through WhatsApp — our team will help you pick the perfect design.
        </p>
      </div>
    </div>
  );
}

function CategoryCard({ category, image }: { category: CategoryWithCount; image: string | null }) {
  const count = category._count?.cakes ?? 0;
  return (
    <Link to={'/shop/categories/' + category.id} className="cat-card">
      <div className="cat-img">
        {image ? (
          <img src={absoluteUrl(image)} alt={category.name} loading="lazy" />
        ) : (
          <div className="cat-img-fallback" aria-hidden="true">{initials(category.name)}</div>
        )}
      </div>
      <div className="cat-body">
        <div className="cat-name">{category.name}</div>
        {category.description && (
          <p className="cat-desc">{category.description}</p>
        )}
        <div className="cat-count-line" style={countLine}>
          <span style={countDot}>{count}</span> <span>{count}{count === 1 ? ' cake' : ' cakes'}</span>
        </div>
        <span className="cat-cta">
          Explore Collection <span className="cat-arrow">→</span>
        </span>
      </div>
    </Link>
  );
}

const about: React.CSSProperties = { background: theme.surface, padding: '2rem', borderRadius: '1.1rem', boxShadow: '0 6px 16px rgba(70,48,34,0.07)' };
const aboutText: React.CSSProperties = { color: theme.body, lineHeight: 1.7, margin: 0 };
const countLine: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '0.5rem' };
const countDot: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '1.7rem', height: '1.7rem', borderRadius: '999px', background: theme.discBg, color: theme.accent, fontWeight: 800, fontSize: '0.9rem' };