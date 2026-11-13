import { Outlet } from 'react-router-dom';
import ShopNav from '../../components/shop/ShopNav';
import ShopFooter from '../../components/shop/ShopFooter';
import { shopGlobalCss } from '../../components/shop/shopCss';

export default function ShopLayout() {
  return (
    <div className="shop-root">
      <style>{shopGlobalCss}</style>
      <ShopNav />
      <main style={{ maxWidth: '76rem', margin: '0 auto', padding: '2rem 1.4rem' }}>
        <Outlet />
      </main>
      <ShopFooter />
    </div>
  );
}