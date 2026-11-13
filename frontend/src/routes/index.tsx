import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import StaffLayout from '../components/StaffLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import CategoriesPage from '../pages/dashboard/CategoriesPage';
import CakesPage from '../pages/dashboard/CakesPage';
import CakeFormPage from '../pages/dashboard/CakeFormPage';
import HeroSlidesPage from '../pages/dashboard/HeroSlidesPage';
import HeroSlideFormPage from '../pages/dashboard/HeroSlideFormPage';
import ShopLayout from '../pages/shop/ShopLayout';
import ShopHomePage from '../pages/shop/ShopHomePage';
import ShopBrowseCakesPage from '../pages/shop/ShopBrowseCakesPage';
import ShopCakeDetailPage from '../pages/shop/ShopCakeDetailPage';
import ShopCategoriesPage from '../pages/shop/ShopCategoriesPage';
import ShopCategoryCakesPage from '../pages/shop/ShopCategoryCakesPage';
import ShopCounterCakesPage from '../pages/shop/ShopCounterCakesPage';
import ShopCustomizedCakePage from '../pages/shop/ShopCustomizedCakePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* PUBLIC CUSTOMER WEBSITE */}
      <Route path="/shop" element={<ShopLayout />}>
        <Route index element={<ShopHomePage />} />
        <Route path="cakes" element={<ShopBrowseCakesPage />} />
        <Route path="cakes/:id" element={<ShopCakeDetailPage />} />
        <Route path="categories" element={<ShopCategoriesPage />} />
        <Route path="categories/:id" element={<ShopCategoryCakesPage />} />
        <Route path="counter-cakes" element={<ShopCounterCakesPage />} />
        <Route path="customized-cake" element={<ShopCustomizedCakePage />} />
      </Route>

      {/* STAFF MANAGEMENT (PROTECTED) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="cakes" element={<CakesPage />} />
        <Route path="cakes/new" element={<CakeFormPage />} />
        <Route path="cakes/:id/edit" element={<CakeFormPage />} />
        <Route path="hero-slides" element={<HeroSlidesPage />} />
        <Route path="hero-slides/new" element={<HeroSlideFormPage />} />
        <Route path="hero-slides/:id/edit" element={<HeroSlideFormPage />} />
      </Route>

      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}