// Global customer-site CSS (hovers + fallbacks) injected once via <style>.
export const shopGlobalCss = `
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
.shop-root { background: #faf6f1; color: #372b22; }

.shop-root .btn:hover { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(60,40,30,0.14); }
.shop-root .btn:active { transform: translateY(0); }
.shop-root .btn-primary:hover { background: #7c352e; }
.shop-root .btn-whatsapp:hover { background: #179349; }
.shop-root .btn-outline:hover { background: rgba(163,74,63,0.08); }
.shop-root .btn-ghost:hover { background: rgba(255,255,255,0.1); }

.shop-root .cake-card:hover { transform: translateY(-5px); box-shadow: 0 22px 40px rgba(70,48,34,0.16), 0 4px 8px rgba(70,48,34,0.08); }
.shop-root .cake-card img { width: 100%; height: 100%; object-fit: cover; display: block; }

.shop-root .media-fallback {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #f4e7db, #e9d8c8 55%, #eedccb);
}
.shop-root .media-fallback .word { font-family: Palatino, Georgia, serif; color: #a34a3f; font-size: 1.6rem; font-style: italic; }

.shop-root .cat-card { transition: transform 0.2s ease, box-shadow 0.22s ease; }
.shop-root .cat-card:hover { transform: translateY(-4px); box-shadow: 0 18px 34px rgba(70,48,34,0.16); }

.shop-root .nav-link { transition: color 0.15s ease, background 0.15s ease; }
.shop-root .nav-link:hover { color: #a34a3f; background: rgba(163,74,63,0.07); }

.shop-root .footer-link { transition: color 0.15s ease; }
.shop-root .footer-link:hover { color: #f2e9dc; }

.shop-root .hero {
  position: relative; border-radius: 1.3rem; overflow: hidden; color: #fffdfb; padding: 3.2rem 2.4rem;
  background: radial-gradient(circle at 82% 20%, rgba(255,220,180,0.16), rgba(0,0,0,0) 46%),
              linear-gradient(118deg, #6f3028 0%, #8c3a30 50%, #a34a3f 100%);
}
.shop-root .hero-title { font-size: 2.5rem; }

/* Mobile nav: hide inline links, show toggle button */
@media (max-width: 720px) {
  .shop-root .nav-inner { flex-wrap: nowrap; }
  .shop-root .nav-mobile-toggle { display: inline-flex !important; }
  .shop-root .nav-links {
    position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; align-items: stretch;
    background: #fffdfb; padding: 0.6rem 1.1rem 0.9rem; border-top: 1px solid #e7dcd1;
    box-shadow: 0 12px 20px rgba(60,40,30,0.10);
  }
  .shop-root .nav-links:not(.nav-open) { display: none !important; }
  .shop-root .nav-link { width: 100%; text-align: center; }
}

@media (max-width: 560px) {
  .shop-root .hero { padding: 2.4rem 1.4rem; }
  .shop-root .hero-title { font-size: 1.9rem; }
}

/* Centered section header */
.shop-root .section-head-center { text-align: center; margin: 3rem 0 1.4rem; }
.shop-root .section-head-center .head-eyebrow { text-transform: uppercase; letter-spacing: 0.16em; font-size: 0.74rem; font-weight: 700; color: #a34a3f; }
.shop-root .section-head-center h2 { font-family: Palatino, Georgia, serif; font-size: 1.9rem; font-weight: 700; color: #372b22; margin: 0.55rem 0 0; }
.shop-root .section-head-center p { color: #6b5f53; margin: 0.5rem auto 0; max-width: 30rem; font-size: 0.98rem; }

/* ---- Premium category card ---- */
.shop-root .cat-grid { display: grid; gap: 1.7rem; grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr)); }
.shop-root .cat-card {
  display: flex; flex-direction: column; text-decoration: none;
  background: #fffdfb; border-radius: 1.05rem; overflow: hidden; border: 1px solid #eadfd3;
  box-shadow: 0 10px 22px rgba(70,48,34,0.10), 0 2px 6px rgba(70,48,34,0.05);
  transition: transform 0.22s ease, box-shadow 0.24s ease, border-color 0.2s ease;
}
.shop-root .cat-card:hover { transform: translateY(-5px); box-shadow: 0 22px 42px rgba(70,48,34,0.16), 0 4px 8px rgba(70,48,34,0.08); border-color: #d8c3ab; }
.shop-root .cat-img { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: #f0e3d5; }
.shop-root .cat-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
.shop-root .cat-card:hover .cat-img img { transform: scale(1.06); }
.shop-root .cat-img-fallback {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: radial-gradient(circle at 32% 26%, rgba(255,255,255,0.35), rgba(0,0,0,0) 46%),
              linear-gradient(135deg, #f2e2d0 0%, #e9d6bf 55%, #e2cbaa 100%);
  font-family: Palatino, Georgia, serif; color: #a34a3f; font-size: 2.6rem; font-style: italic;
}
.shop-root .cat-body { padding: 1.1rem 1.2rem 1rem; }
.shop-root .cat-name { font-family: Palatino, Georgia, serif; font-size: 1.32rem; font-weight: 700; color: #372b22; }
.shop-root .cat-desc { color: #98897a; font-size: 0.9rem; line-height: 1.5; margin: 0.35rem 0 0; }
.shop-root .cat-count-line { display: flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem; font-size: 0.86rem; color: #6b5f53; }

.shop-root .cat-cta {
  display: inline-flex; align-items: center; gap: 0.45rem; margin-top: 0.85rem;
  color: #a34a3f; font-weight: 700; font-size: 0.95rem;
}
.shop-root .cat-card:hover .cat-cta .cat-arrow { transform: translateX(4px); }
.shop-root .cat-arrow { display: inline-block; transition: transform 0.2s ease; }
.shop-root .cat-card:focus-visible { outline: 2px solid #a34a3f; outline-offset: 2px; border-radius: 1.05rem; }

/* ---- Reusable premium CTA link (matches "Explore Collection →") ---- */
.shop-root .shop-cta-link {
  display: inline-flex; align-items: center; gap: 0.45rem;
  color: #a34a3f; font-weight: 700; font-size: 0.95rem;
  text-decoration: none; cursor: pointer;
}
.shop-root .shop-cta-link:hover { color: #7c352e; }
.shop-root .shop-cta-link.back-inline { display: inline-flex; align-items: center; gap: 0.45rem; margin-bottom: 1rem; }
.shop-root .shop-cta-link svg, .shop-root .shop-cta-link .cta-arrow {
  transition: transform 0.2s ease;
}
.shop-root .shop-cta-link:hover .cta-arrow { transform: translateX(4px); }
.shop-root .shop-cta-link:focus-visible { outline: 2px solid #a34a3f; outline-offset: 2px; }
/* Readable variant for dark/hero backgrounds (premium, no button box). */
.shop-root .shop-cta-link--on-dark {
  color: #fffdfb; font-weight: 700; font-size: 0.95rem;
  text-decoration: none; cursor: pointer;
}
.shop-root .shop-cta-link--on-dark:hover { color: #ffd29a; }
.shop-root .shop-cta-link--on-dark:hover .cta-arrow { transform: translateX(4px); }

/* ---- Custom cake CTA band ---- */
.shop-root .custom-band {
  border-radius: 1.4rem; overflow: hidden; margin-top: 1rem;
  background: #f7efe3;
  border: 1px solid #e6d7c3;
  box-shadow: 0 14px 30px rgba(90,60,40,0.10), 0 3px 8px rgba(90,60,40,0.05);
  display: grid; grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr)); gap: 0;
}
.shop-root .custom-media { position: relative; height: 100%; min-height: 17rem; overflow: hidden; background: #f0e3d5; }
.shop-root .custom-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
.shop-root .custom-media-fallback {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.34), rgba(0,0,0,0) 46%),
              linear-gradient(140deg, #f0ddc6 0%, #e8d2b6 55%, #ddc4a2 100%);
  font-family: Palatino, Georgia, serif; color: #7c352e; font-size: 2rem;
}
.shop-root .custom-media-deco { position: absolute; inset: 0; opacity: 0.16; background: radial-gradient(circle at 78% 22%, rgba(201,148,63,0.5), rgba(0,0,0,0) 40%); }
.shop-root .custom-band-top {
  position: relative; padding: 2.2rem 2.1rem; display: flex; flex-direction: column; align-items: flex-start; justify-content: center;
}
.shop-root .custom-band-top .cb-eyebrow { text-transform: uppercase; letter-spacing: 0.18em; font-size: 0.72rem; font-weight: 700; color: #a34a3f; }
.shop-root .custom-band-top h2 { font-family: Palatino, Georgia, serif; font-size: 1.75rem; font-weight: 700; color: #372b22; line-height: 1.2; margin: 0.65rem 0 0; }
.shop-root .custom-band-top p { color: #6b5f53; font-size: 0.98rem; line-height: 1.6; margin: 0.7rem 0 0; }
.shop-root .custom-band-top .custom-cta-link { display: inline-flex; align-items: center; gap: 0.45rem; margin-top: 1.15rem; font-weight: 700; font-size: 1rem; }

@media (max-width: 860px) {
  .shop-root .cat-grid { grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); }
  .shop-root .custom-band { grid-template-columns: 1fr; }
}

@media (max-width: 540px) {
  .shop-root .cat-grid { grid-template-columns: 1fr; }
  .shop-root .custom-media { min-height: 13rem; }
}

/* ---- Hero carousel ---- */
.shop-root .hero-carousel {
  position: relative; width: 100%; margin-top: 0.4rem;
  background: #a34a3f; /* fallback tint when no image */
  min-height: 26rem;
}
.shop-root .hero-slides {
  position: relative; width: 100%; overflow: hidden;
}
.shop-root .hero-track {
  display: flex; flex-direction: row; width: 100%;
  transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
  will-change: transform;
}
.shop-root .hero-slide {
  flex: 0 0 100%; position: relative; width: 100%; min-height: 27rem; max-height: 34rem;
  display: flex; align-items: center; justify-content: flex-start;
}
.shop-root .hero-slide-bg { position: absolute; inset: 0; }
.shop-root .hero-slide-bg img { width: 100%; height: 100%; object-fit: cover; display: block; }
.shop-root .hero-slide-shade {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(90deg, rgba(30,18,14,0.78) 0%, rgba(30,18,14,0.45) 42%, rgba(30,18,14,0.18) 100%);
}
.shop-root .hero-slide-fallback {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: radial-gradient(circle at 28% 34%, rgba(255,228,200,0.5), rgba(0,0,0,0) 48%),
              linear-gradient(135deg, #6f3028 0%, #8c3a30 52%, #a34a3f 100%);
  color: #fffdfb;
}
.shop-root .hero-slide-fallback .hero-orn { font-family: Palatino, Georgia, serif; font-size: 7rem; opacity: 0.85; }
.shop-root .hero-slide-content {
  position: relative; z-index: 2; max-width: 44rem; padding: 2.5rem 2.6rem;
}
.shop-root .hero-slide-title {
  font-family: Palatino, Georgia, serif; color: #fffdfb; font-size: 2.4rem; font-weight: 700; line-height: 1.14; margin: 0;
  text-shadow: 0 2px 12px rgba(0,0,0,0.25);
}
.shop-root .hero-slide-sub { color: #f6eadf; font-size: 1.08rem; line-height: 1.5; margin: 0.8rem 0 0; max-width: 34rem; }
.shop-root .hero-slide-btn { margin-top: 1.2rem; }
.shop-root .hero-arrow {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 5;
  background: rgba(255,253,251,0.88); border: none; cursor: pointer; width: 2.7rem; height: 2.7rem; border-radius: 999px;
  color: #a34a3f; font-size: 1.2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.16);
  display: flex; align-items: center; justify-content: center; transition: background 0.18s ease, transform 0.18s ease;
}
.shop-root .hero-arrow:hover { background: #fffdfb; transform: translateY(-50%) scale(1.08); }
.shop-root .hero-arrow-prev { left: 1rem; }
.shop-root .hero-arrow-next { right: 1rem; }
.shop-root .hero-dots {
  position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); z-index: 6;
  display: flex; gap: 0.55rem;
}
.shop-root .hero-dot {
  width: 0.6rem; height: 0.6rem; border-radius: 999px; border: none; cursor: pointer; padding: 0;
  background: rgba(255,253,251,0.5); transition: background 0.2s ease, transform 0.2s ease, width 0.2s ease;
}
.shop-root .hero-dot-active { background: #fffdfb; width: 1.5rem; }
.shop-root .hero-carousel:focus-visible, .shop-root .hero-arrow:focus-visible, .shop-root .hero-dot:focus-visible { outline: 2px solid #ffd29a; outline-offset: 2px; }

@media (max-width: 720px) {
  .shop-root .hero-slide-title { font-size: 1.75rem; }
  .shop-root .hero-slide-content { padding: 1.8rem 1.6rem; }
  .shop-root .hero-slide { min-height: 22rem; }
  .shop-root .hero-arrow-prev { left: 0.5rem; }
  .shop-root .hero-arrow-next { right: 0.5rem; }
  .shop-root .hero-arrow { width: 2.3rem; height: 2.3rem; font-size: 1rem; }
}

@media (max-width: 420px) {
  .shop-root .hero-slide-title { font-size: 1.45rem; }
  .shop-root .hero-slide-sub { font-size: 0.98rem; }
  .shop-root .hero-slide { min-height: 19rem; }
}
`;