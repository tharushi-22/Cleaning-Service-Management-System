import React, { useState } from 'react';
import { Sparkles, MessageCircle, MapPin, Phone, Mail, Clock, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';

export default function Footer() {
  const [clickedIcon, setClickedIcon] = useState(null);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleIconClick = (platform) => {
    setClickedIcon(platform);
    setTimeout(() => setClickedIcon(null), 200);
  };

  return (
    <footer style={{ background: '#085a51', color: 'rgba(255,255,255,0.7)', padding: '3.5rem 4vw 1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: '3rem', marginBottom: '2.5rem' }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.45rem', fontWeight: 900, color: '#fff', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: 10 }}><Sparkles size={20} /> SparkleClean Pro</div>
          <p style={{ fontSize: '0.87rem', lineHeight: 1.75, marginBottom: '1.2rem' }}>
            Delivering spotless spaces and peace of mind since 2012. Trusted by thousands of homes and businesses across Sri Lanka.
          </p>
          <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '9px 20px', borderRadius: 999, fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            <MessageCircle size={16} /> WhatsApp Us
          </a>
        </div>
        <div>
          <h4 style={{ fontSize: '0.83rem', fontWeight: 600, color: '#fff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Services</h4>
          {['Deep Home Cleaning', 'Office Cleaning', 'Move In/Out Clean', 'Post-Construction', 'Carpet Shampooing'].map(s => (
            <button key={s} onClick={() => scrollTo('#services')} style={{ display: 'block', background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '0.83rem', marginBottom: '0.5rem', cursor: 'pointer', padding: 0, fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--teal)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>{s}</button>
          ))}
        </div>
        <div>
          <h4 style={{ fontSize: '0.83rem', fontWeight: 600, color: '#fff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.83rem', marginBottom: '0.5rem' }}><MapPin size={16} /> No 45, Galle Road,<br />Colombo 03, Sri Lanka</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.83rem', marginBottom: '0.5rem' }}><Phone size={16} /> +94 77 123 4567</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.83rem', marginBottom: '0.5rem' }}><Mail size={16} /> hello@sparklecleanpro.lk</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.83rem' }}><Clock size={16} /> Mon–Sat 7am–8pm · Sun 9am–5pm</div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: '0.78rem' }}>© {new Date().getFullYear()} SparkleClean Pro LLC · All rights reserved</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" onClick={() => handleIconClick('facebook')} style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', background: clickedIcon === 'facebook' ? 'var(--teal-light)' : 'transparent', transition: 'all 0.15s' }}>
            <Facebook size={18} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" onClick={() => handleIconClick('instagram')} style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', background: clickedIcon === 'instagram' ? 'var(--teal-light)' : 'transparent', transition: 'all 0.15s' }}>
            <Instagram size={18} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" onClick={() => handleIconClick('linkedin')} style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', background: clickedIcon === 'linkedin' ? 'var(--teal-light)' : 'transparent', transition: 'all 0.15s' }}>
            <Linkedin size={18} />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" onClick={() => handleIconClick('youtube')} style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', background: clickedIcon === 'youtube' ? 'var(--teal-light)' : 'transparent', transition: 'all 0.15s' }}>
            <Youtube size={18} />
          </a>
        </div>
      </div>
      <style>{`@media(max-width:768px){ footer > div:first-child { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
}