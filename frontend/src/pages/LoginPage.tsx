import { FormEvent, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message || 'Unable to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff7f2', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ width: '22rem', background: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h2 style={{ marginTop: 0, color: '#b4525a' }}>Smart Cake Shop</h2>
        <p style={{ color: '#777', marginTop: '0.25rem' }}>Staff Login</p>
        {error && <p style={{ color: '#c0392b', background: '#fdecea', padding: '0.6rem', borderRadius: '6px', fontSize: '0.9rem' }}>{error}</p>}
        <label style={{ display: 'block', marginTop: '1rem', fontWeight: 600 }}>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          style={{ width: '100%', boxSizing: 'border-box', padding: '0.6rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #ddd' }}
        />
        <label style={{ display: 'block', marginTop: '1rem', fontWeight: 600 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          style={{ width: '100%', boxSizing: 'border-box', padding: '0.6rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #ddd' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', marginTop: '1.4rem', padding: '0.7rem', background: '#b4525a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: loading ? 'default' : 'pointer' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}