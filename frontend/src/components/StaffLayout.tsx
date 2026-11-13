import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function StaffLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'block',
    padding: '0.65rem 1rem',
    borderRadius: '6px',
    textDecoration: 'none',
    color: isActive ? '#fff' : '#444',
    background: isActive ? '#b4525a' : 'transparent',
    fontWeight: 600,
    marginBottom: '0.25rem',
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f7f2ee', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '15rem', background: '#2c2825', color: '#f0e6dc', minHeight: '100vh', position: 'sticky', top: 0 }}>
        <div style={{ padding: '1.2rem 1rem', fontSize: '1.05rem', fontWeight: 700, color: '#ffd29a' }}>Smart Cake Shop</div>
        <div style={{ padding: '0 0.75rem', fontSize: '0.85rem', color: '#b9b0a5', marginTop: '0.4rem' }}>Staff: {user?.username}</div>
        <nav style={{ marginTop: '1.2rem', padding: '0.25rem 0.75rem' }}>
          <NavLink end to="/dashboard" style={({ isActive }) => navLinkStyle(isActive)}>Dashboard</NavLink>
          <NavLink to="/dashboard/cakes" style={({ isActive }) => navLinkStyle(isActive)}>Cakes</NavLink>
          <NavLink to="/dashboard/categories" style={({ isActive }) => navLinkStyle(isActive)}>Categories</NavLink>
          <NavLink to="/dashboard/hero-slides" style={({ isActive }) => navLinkStyle(isActive)}>Hero Slides</NavLink>
        </nav>
        <button
          onClick={handleLogout}
          style={{ margin: '1.5rem 0.75rem', width: 'calc(100% - 1.5rem)', padding: '0.55rem', background: 'transparent', color: '#e0b8a8', border: '1px solid #e0b8a8', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
        >
          Logout
        </button>
      </aside>
      <main style={{ flex: 1, padding: '2rem 2.5rem', overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}