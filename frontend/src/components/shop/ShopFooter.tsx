import { Link } from 'react-router-dom';
import { theme } from './theme';

export default function ShopFooter() {
  return (
    <footer style={wrap}>
      <div style={inner}>
        <div>
          <div style={brand}><span style={{ color: theme.gold }}>Smart</span> Cake Shop</div>
          <p style={text}>Fresh cakes for every celebration. Available at our counter or made to order.</p>
        </div>
        <nav style={links}>
          <Link to="/shop/customized-cake" style={link}>Customize a Cake</Link>
          <Link to="/shop/counter-cakes" style={link}>Counter Cakes</Link>
          <Link to="/shop/cakes" style={link}>All Cakes</Link>
        </nav>
      </div>
    </footer>
  );
}

const wrap: React.CSSProperties = { marginTop: '3rem', background: '#372b22', color: '#f2e9dc', padding: '2.2rem 1.4rem' };
const inner: React.CSSProperties = { maxWidth: '76rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.9rem' };
const brand: React.CSSProperties = { fontFamily: theme.serif, fontSize: '1.25rem', fontWeight: 700 };
const text: React.CSSProperties = { color: '#cdbfaa', fontSize: '0.92rem', lineHeight: 1.65, margin: '0.4rem 0 0', maxWidth: '34rem' };
const links: React.CSSProperties = { display: 'flex', gap: '1.2rem', flexWrap: 'wrap' };
const link: React.CSSProperties = { color: '#d8cbb6', textDecoration: 'none', fontSize: '0.9rem' };