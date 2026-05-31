import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function UserLogin() {
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.state?.isSignUp || false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp && !form.name) { toast.error('Please enter your name'); return; }
    if (!form.email || !form.password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      if (isSignUp) {
        await register(form.name, form.email, form.password);
        toast.success('Account created successfully!');
      } else {
        await login(form.email, form.password);
        toast.success('Welcome back!');
      }
      navigate('/', { replace: true, state: {} });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Authentication failed');
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
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary)', marginBottom: 6, display: 'inline-flex', alignItems: 'center', gap: 8 }}><Sparkles size={24} /> SparkleClean</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{isSignUp ? 'Create your account' : 'Sign in to your account'}</div>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          {isSignUp && (
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-mid)' }}>Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="John Doe" style={inp}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
          )}
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-mid)' }}>Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com" style={inp}
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
            {loading ? 'Please wait...' : isSignUp ? 'Sign Up →' : 'Sign In →'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}>
          {isSignUp ? (
            <span style={{ color: 'var(--text-muted)' }}>Already have an account? <button onClick={() => setIsSignUp(false)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Sign In</button></span>
          ) : (
            <span style={{ color: 'var(--text-muted)' }}>Don't have an account? <button onClick={() => setIsSignUp(true)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Sign Up</button></span>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/" style={{ fontSize: '0.83rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← Back to Website</Link>
          <span style={{ margin: '0 10px', color: 'var(--border)' }}>|</span>
          <Link to="/admin/login" style={{ fontSize: '0.83rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Admin Login →</Link>
        </div>
      </div>
    </div>
  );
}
