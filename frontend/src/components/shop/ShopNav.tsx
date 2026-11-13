import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { theme } from './theme';

export default function ShopNav() {
  const [open, setOpen] = useState(false);

  const links: { to: string; label: string; end?: boolean }[] = [
    { to: '/shop', label: 'Home', end: true },
    { to: '/shop/cakes', label: 'Cakes' },
    { to: '/shop/categories', label: 'Categories' },
    { to: '/shop/counter-cakes', label: 'Counter Cakes' },
    { to: '/shop/customized-cake', label: 'Customized Cake' },
  ];

  return (
    <header style={navWrap}>
      <div style={inner}>
        <NavLink to="/shop" className="nav-link" style={brand} onClick={() => setOpen(false)}>
          <span style={brandAccent}>Smart</span> Cake Shop
        </NavLink>

        <button
          className="nav-mobile-toggle"
          style={toggle}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          {open ? '✕' : '☰'}
        </button>

        <nav className={'nav-links' + (open ? ' nav-open' : '')} style={open ? { ...linksWrap, display: 'flex' } : { ...linksWrap }}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link-active' : '')}
              style={({ isActive }) => linkStyle(isActive)}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

const navWrap: React.CSSProperties = {
  position: 'sticky', top: 0, zIndex: 40,
  background: theme.surface, borderBottom: '1px solid ' + theme.line,
  boxShadow: '0 2px 12px rgba(60,40,30,0.06)',
};
const inner: React.CSSProperties = {
  maxWidth: '76rem', margin: '0 auto', padding: '0.8rem 1.4rem',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
};
const brand: React.CSSProperties = { fontFamily: theme.serif, fontSize: '1.3rem', fontWeight: 700, color: theme.ink, textDecoration: 'none' };
const brandAccent: React.CSSProperties = { color: theme.accent };
const linksWrap: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '0.15rem', flexWrap: 'wrap' };
const linkStyle = (isActive: boolean): React.CSSProperties => ({
  padding: '0.55rem 0.95rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.92rem',
  color: isActive ? theme.accent : theme.body, background: isActive ? 'rgba(163,74,63,0.09)' : 'transparent',
});
const toggle: React.CSSProperties = { display: 'none', background: 'none', border: '1px solid ' + theme.line, borderRadius: '8px', color: theme.ink, padding: '0.4rem 0.7rem', fontSize: '1.15rem', lineHeight: 1, cursor: 'pointer' };