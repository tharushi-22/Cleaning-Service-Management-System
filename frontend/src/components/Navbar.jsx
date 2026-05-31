import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, LogOut, LayoutDashboard, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close profile dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (location.pathname === '/services') setActive('/services');
    else if (location.pathname === '/') setActive('#home');
  }, [location.pathname]);

  const scrollTo = (href) => {
    setMenuOpen(false);
    setActive(href);
    if (href.startsWith('/')) {
      navigate(href);
      setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }, 120);
      return;
    }
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const initials = user
    ? (user.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '';

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
      height: 68, display: 'flex', alignItems: 'center', padding: '0 4vw',
      background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
      borderBottom: '1px solid var(--border)',
      boxShadow: scrolled ? 'var(--shadow)' : 'none',
      backdropFilter: 'blur(12px)',
      transition: 'box-shadow 0.3s',
      gap: '1.5rem',
    }}>
      <a href="#home" onClick={() => scrollTo('#home')} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '1.45rem', color: 'var(--primary)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
        <span style={{ background: 'var(--primary)', color: '#fff', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={18} /></span>
        SparkleClean<span style={{ color: '#29c0b6' }}>Pro</span>
      </a>

      {/* Desktop links */}
      <div className="hide-mobile" style={{ display: 'flex', gap: 2, flex: 1, justifyContent: 'center' }}>
        {links.map(l => (
          <button key={l.href} onClick={() => scrollTo(l.href)} style={{
            background: active === l.href ? 'var(--teal-light)' : 'transparent',
            color: active === l.href ? 'var(--primary)' : 'var(--text-mid)',
            border: 'none', padding: '6px 14px', borderRadius: 999,
            fontSize: '0.88rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
            fontFamily: "'DM Sans', sans-serif",
          }}>{l.label}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', alignItems: 'center' }}>
        {user ? (
          /* ─── Profile avatar + dropdown ─── */
          <div ref={profileRef} className="hide-mobile" style={{ position: 'relative' }}>
            <button
              id="profile-toggle"
              onClick={() => setProfileOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: profileOpen ? 'var(--teal-light)' : 'transparent',
                border: '1.5px solid', borderColor: profileOpen ? 'var(--primary)' : 'var(--border)',
                borderRadius: 999, padding: '5px 12px 5px 5px', cursor: 'pointer',
                transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => { if (!profileOpen) e.currentTarget.style.borderColor = 'var(--teal)'; }}
              onMouseLeave={e => { if (!profileOpen) e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              {/* Avatar */}
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '0.78rem',
                letterSpacing: '0.04em', flexShrink: 0,
              }}>
                {initials}
              </div>
              <span className="hide-mobile" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)' }}>
                {user.name?.split(' ')[0] || 'User'}
              </span>
              <ChevronDown
                size={15}
                color="var(--text-muted)"
                style={{
                  transition: 'transform 0.2s',
                  transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)',
                }}
              />
            </button>

            {/* ─── Dropdown Menu ─── */}
            {profileOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                background: '#fff', borderRadius: 14,
                border: '1px solid var(--border)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)',
                minWidth: 240, overflow: 'hidden',
                animation: 'profileDropIn 0.2s ease',
                zIndex: 1000,
              }}>
                {/* User info header */}
                <div style={{
                  padding: '16px 16px 14px', borderBottom: '1px solid #f1f5f9',
                  background: 'linear-gradient(135deg, #f0fdfa 0%, #f5f7fa 100%)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: '0.88rem', flexShrink: 0,
                    }}>
                      {initials}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    marginTop: 10, display: 'inline-block',
                    padding: '3px 10px', borderRadius: 999, fontSize: '0.68rem',
                    fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                    background: user.role === 'admin' ? '#dbeafe' : '#dcfce7',
                    color: user.role === 'admin' ? '#1d4ed8' : '#166534',
                  }}>
                    {user.role}
                  </div>
                </div>

                {/* Menu items */}
                <div style={{ padding: '6px' }}>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => { setProfileOpen(false); navigate('/admin'); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                        padding: '10px 12px', border: 'none', borderRadius: 8,
                        background: 'transparent', cursor: 'pointer', transition: 'all 0.15s',
                        fontSize: '0.88rem', fontWeight: 500, color: 'var(--text)',
                        fontFamily: "'DM Sans', sans-serif", textAlign: 'left',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#f0fdfa'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <LayoutDashboard size={16} color="var(--primary)" />
                      Admin Dashboard
                    </button>
                  )}

                  <button
                    onClick={() => { setProfileOpen(false); /* Could navigate to profile page */ }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                      padding: '10px 12px', border: 'none', borderRadius: 8,
                      background: 'transparent', cursor: 'pointer', transition: 'all 0.15s',
                      fontSize: '0.88rem', fontWeight: 500, color: 'var(--text)',
                      fontFamily: "'DM Sans', sans-serif", textAlign: 'left',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#f0fdfa'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <User size={16} color="var(--text-muted)" />
                    My Profile
                  </button>
                </div>

                {/* Logout */}
                <div style={{ padding: '4px 6px 6px', borderTop: '1px solid #f1f5f9' }}>
                  <button
                    id="logout-btn"
                    onClick={handleLogout}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                      padding: '10px 12px', border: 'none', borderRadius: 8,
                      background: 'transparent', cursor: 'pointer', transition: 'all 0.15s',
                      fontSize: '0.88rem', fontWeight: 600, color: '#dc2626',
                      fontFamily: "'DM Sans', sans-serif", textAlign: 'left',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="hide-mobile" style={{ color: 'var(--text-mid)', fontWeight: 600, fontSize: '0.92rem', padding: '8px 16px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-mid)'}>Log In</Link>
            <Link to="/login" state={{ isSignUp: true }} className="btn btn-outline hide-mobile" style={{ padding: '8px 22px', fontSize: '0.92rem' }}>Sign Up</Link>
          </>
        )}
        {/* Mobile menu toggle */}
        <button onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: 'none', color: 'var(--text)', display: 'none' }} className="mobile-menu-btn" aria-label="Menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: 'absolute', top: 68, left: 0, right: 0, background: '#fff', borderBottom: '1px solid var(--border)', padding: '1rem 4vw', display: 'flex', flexDirection: 'column', gap: 6, zIndex: 998 }}>
          {links.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '10px 0', fontSize: '1rem', color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif", borderBottom: '1px solid var(--border)' }}>{l.label}</button>
          ))}
          {user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '0.78rem',
                }}>
                  {initials}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text)' }}>{user.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{user.email}</div>
                </div>
              </div>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} style={{ padding: '10px 0', fontSize: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <LayoutDashboard size={16} /> Admin Dashboard
                </Link>
              )}
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '10px 0', fontSize: '1rem', color: '#dc2626', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <LogOut size={16} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} style={{ padding: '10px 0', fontSize: '1rem', color: 'var(--primary)' }}>Sign In / Sign Up</Link>
              <Link to="/admin/login" onClick={() => setMenuOpen(false)} style={{ padding: '10px 0', fontSize: '1rem', color: 'var(--primary)' }}>Admin Dashboard</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        .mobile-menu-btn { display: none !important; }
        @media(max-width:768px){ .mobile-menu-btn { display: flex !important; } }
        @keyframes profileDropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </nav>
  );
}