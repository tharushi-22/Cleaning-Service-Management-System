import React from 'react';

const gradients = [
  'linear-gradient(135deg,#0d7a6e22,#17c3b222)',
  'linear-gradient(135deg,#1a6fa822,#5ba8e022)',
  'linear-gradient(135deg,#0d5c5222,#17c3b222)',
  'linear-gradient(135deg,#085a5122,#14a89922)',
  'linear-gradient(135deg,#1a6fa822,#0d7a6e22)',
  'linear-gradient(135deg,#17c3b222,#5ba8e022)',
  'linear-gradient(135deg,#0d7a6e22,#1a6fa822)',
  'linear-gradient(135deg,#14a89922,#17c3b222)',
];

export default function ServiceCard({ service, index, onBook }) {
  return (
    <div className="card fade-in" style={{ overflow: 'hidden', transition: 'all 0.3s', cursor: 'default' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'var(--border)'; }}>
      <div style={{ height: 180, position: 'relative', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
        {service.imgSrc ? (
          <img src={service.imgSrc} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ height: '100%', background: '#f3f7f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: 'var(--text-muted)', padding: 12 }}>
            <div style={{ textAlign: 'center' }}>{service.name}</div>
          </div>
        )}
        {service.popular && (
          <span style={{ position: 'absolute', top: 10, right: 10, background: 'var(--primary)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 999, letterSpacing: '0.06em' }}>POPULAR</span>
        )}
      </div>
      <div style={{ padding: '1.1rem 1.3rem' }}>
        <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>{service.name}</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>{service.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)' }}>${service.price}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{service.unit}</span>
          </div>
          <button className="btn btn-sm" onClick={() => onBook(service)}
            style={{ background: 'var(--teal-light)', color: 'var(--primary)', border: 'none', borderRadius: 999, fontWeight: 600 }}
            onMouseEnter={e => { e.target.style.background = 'var(--primary)'; e.target.style.color = '#fff'; }}
            onMouseLeave={e => { e.target.style.background = 'var(--teal-light)'; e.target.style.color = 'var(--primary)'; }}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}