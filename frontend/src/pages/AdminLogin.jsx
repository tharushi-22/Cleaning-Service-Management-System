import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: '100%', padding: '11px 14px', border: '1.5px solid var(--border)', borderRadius: 10,
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: 'var(--text)',
    outline: 'none', marginTop: 5, transition: 'border-color 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0d2b29,#0d5c52)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#fff', borderRadius: 24, padding: '2.5rem 2.2rem', width: '100%', maxWidth: 420, boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary)', marginBottom: 6, display: 'inline-flex', alignItems: 'center', gap: 8 }}><Sparkles size={24} /> SparkleClean Pro</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Admin Dashboard — Sign In</div>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-mid)' }}>Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="admin@example.com" style={inp}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          </div>
          <div style={{ marginBottom: '1.8rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-mid)' }}>Password</label>
            <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••" style={inp}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          </div>
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: 13, background: loading ? 'var(--text-muted)' : 'var(--primary)',
            color: '#fff', border: 'none', borderRadius: 12, fontSize: '1rem', fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
          }}>
            {loading ? 'Signing In...' : 'Sign In →'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/" style={{ fontSize: '0.83rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← Back to Website</Link>
        </div>
        <div style={{ marginTop: '1.5rem', background: 'var(--teal-light)', borderRadius: 10, padding: '0.9rem 1rem', fontSize: '0.78rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>
          <strong>Demo credentials:</strong><br />
          Email: admin@example.com<br />
          Password: Admin123
        </div>
      </div>
    </div>
  );
}