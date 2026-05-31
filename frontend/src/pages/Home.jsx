import React, { useState, useEffect } from 'react';
import { Leaf, ShieldCheck, Star, Clock, MessageCircle, MapPin, Phone, Mail, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import ServiceCard from '../components/ServiceCard';

const GALLERY = [
  { label: 'Living Room', src: 'https://harmonyhome-design.com/wp-content/uploads/2025/02/A-Contemporary-Minimalist-Living-Room-with-Angular-Lines.jpg', span: '2 / 2' },
  { label: 'Windows', src: 'https://images.contentstack.io/v3/assets/bltf589e66bcaecd79c/blta944c1907dd5637b/683f3d0e954d3bb42d941d5b/floor-to-ceiling-windows-meditation-room.jpg?width=1152&height=766&format=jpg&quality=90' },
  { label: 'Kitchen', src: 'https://www.405cs.com/wp-content/uploads/2024/04/How-Modern-Kitchen-Design-Ideas-Influence-Cooking-Habits-Creativity-00004-1-1.webp' },
  { label: 'Bathroom', src: 'https://st.hzcdn.com/simgs/b071b10205cf04ef_14-6054/_.jpg' },
  { label: 'Garden', src: 'https://cdn.prod.website-files.com/63a02e61e7ffb565c30bcfc7/69fe03d1ecd1e4fed2e06871_ChatGPT%20Image%20May%208%2C%202026%2C%2009_04_44%20PM.png' },
  { label: 'Bedroom', src: 'https://media.architecturaldigest.com/photos/67bcc8747dfc89b75d51a6ab/16:9/w_2048,h_1152,c_limit/Kishani%20Perera_Point%20Dume%20Project_Photographer%20Anthony%20Barcelo.jpg' },
  { label: 'Office', src: 'https://t4.ftcdn.net/jpg/03/84/55/29/360_F_384552930_zPoe9zgmCF7qgt8fqSedcyJ6C6Ye3dFs.jpg' },
  { label: 'Apartment', src: 'https://media-production.lp-cdn.com/media/bg1na4wu6op3dxz9qpesn1mi' },
];

const SERVICE_IMAGES = {
  'Deep Cleaning': 'https://www.restorations-uk.com/wp-content/uploads/2026/02/deep-clean-shutterstock_1695842029-med.jpg',
  'Office Cleaning': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
  'Sofa Cleaning': 'https://interwood.pk/cdn/shop/files/Majestic-Sofa-gv-2s_jpg.jpg?v=1778744034',
};

export default function Home() {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingSvc, setLoadingSvc] = useState(true);
  const navigate = useNavigate();

  const featuredServices = services.slice(0, 3);

  useEffect(() => {
    api.get('/services').then(({ data }) => { setServices(data.data); setLoadingSvc(false); }).catch(() => setLoadingSvc(false));
    api.get('/reviews').then(({ data }) => setReviews(data.data)).catch(() => { });
  }, []);

  const handleBook = (svc) => {
    navigate('/services', { state: { serviceId: svc._id } });
  };

  return (
    <>
      {/* ── HERO ── */}
      <section id="home" style={{
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(180deg, rgba(13,43,41,0.85), rgba(28,160,144,0.35)), url(https://cdn.sanity.io/images/k55su7ch/production2/d9e35a73891d43ccb0bc665bf2e0d5d9d6f1ea2b-4200x2363.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', padding: '68px 4vw 0', position: 'relative', overflow: 'hidden',
      }}>
        <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}`}</style>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 680 }} className="fade-in">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#7de8e0', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999, marginBottom: '1.5rem' }}>
            <Sparkles size={16} /> Award-Winning Cleaning Service
          </div>
          <h1 style={{ fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '1.2rem', fontFamily: "'Playfair Display',serif" }}>
            Sparkling Spaces,<br /><span style={{ color: 'var(--teal)' }}>Peaceful Minds.</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: '2.2rem', maxWidth: 500 }}>
            Professional cleaning services tailored to your lifestyle. From deep cleans to daily upkeep — we bring sparkle back to every space you love.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => navigate('/services')}
              style={{ background: 'var(--teal)', color: '#0d2b29', borderRadius: 999, padding: '14px 32px', fontSize: '1rem', fontWeight: 600, border: 'none' }}>
              Book Now →
            </button>
            <button className="btn" onClick={() => navigate('/services')}
              style={{ background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.35)', borderRadius: 999, padding: '14px 32px', fontSize: '1rem', fontWeight: 600 }}>
              Explore Services
            </button>
          </div>
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.12)', flexWrap: 'wrap' }}>
            {[['4,800+', 'Happy Clients'], ['98%', 'Satisfaction'], ['12 yrs', 'Experience'], ['50+', 'Staff']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <strong style={{ display: 'block', fontSize: '1.8rem', fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display',serif" }}>{v}</strong>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: '#fff', padding: '5rem 4vw' }}>
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '4/3', background: '#f3f7f6', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
            <img src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80" alt="Professional cleaning service team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(13,90,81,0.12),rgba(13,90,81,0.03))' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'rgba(255,255,255,0.92)', borderRadius: '20px 0 24px 0', padding: '1.2rem 1.5rem', zIndex: 2, minWidth: 170 }}>
              <strong style={{ display: 'block', fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)', fontFamily: "'Playfair Display',serif" }}>12 Years</strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>of Excellence</span>
            </div>
          </div>
          <div>
            <div className="section-label">About SparkleClean Pro</div>
            <h2 className="section-title">We don't just clean—<span> we transform.</span></h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
              Founded in 2012, SparkleClean Pro has become the most trusted cleaning service across the region. Our certified team uses hospital-grade, eco-friendly products safe for your family and pets — delivering a level of cleanliness you can see and feel.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Every cleaner undergoes an 80-hour training program and background verification. We're fully insured and bonded, so you can trust us in your home with complete peace of mind.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              {[[Leaf, 'Eco-Friendly', 'Non-toxic, plant-based solutions'], [ShieldCheck, 'Fully Insured', '100% bonded & background-checked'], [Star, '5-Star Rated', '4.9 avg across 2,400+ reviews'], [Clock, 'On-Time Always', 'Punctual, reliable, professional']].map(([Icon, title, sub]) => (
                <div key={title} style={{ background: 'var(--teal-light)', borderRadius: 14, padding: '1rem 1.2rem', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ background: 'var(--primary)', color: '#fff', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}><Icon size={16} /></div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>{title}</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: 'var(--off-white)', padding: '5rem 4vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: '2.2rem', textAlign: 'center' }}>
            <div className="section-label">Featured Services</div>
            <h2 className="section-title">Our <span>top cleaning services</span></h2>
            <p className="section-sub">A quick preview of three popular services, with the full menu available on the services page.</p>
          </div>

          {loadingSvc ? <div className="spinner" /> : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', alignItems: 'stretch' }}>
                {featuredServices.map((s, i) => {
                  const serviceWithImage = { ...s, imgSrc: s.image || SERVICE_IMAGES[s.name] || s.imgSrc || '' };
                  return (
                    <div key={s._id} style={{ display: 'flex' }}>
                      <ServiceCard service={serviceWithImage} index={i} onBook={handleBook} />
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button onClick={() => { navigate('/services'); window.scrollTo(0, 0); }} className="btn btn-primary" style={{ padding: '0.95rem 2rem', borderRadius: 999, fontWeight: 700 }}>View Full Service Menu</button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" style={{ background: '#fff', padding: '5rem 4vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div className="section-label">Our Work</div>
            <h2 className="section-title">Before & After <span>Transformations</span></h2>
            <p className="section-sub">Real results from real homes. Our team's pride is the shine we leave behind.</p>
          </div>
          <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridTemplateRows: 'auto auto', gap: '1rem' }}>
            {GALLERY.map((g, i) => (
              <div key={i} style={{
                position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '1', transition: 'transform 0.3s', cursor: 'pointer',
                gridColumn: i === 0 ? 'span 2' : 'span 1', gridRow: i === 0 ? 'span 2' : 'span 1',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}>
                <img src={g.src} alt={g.label} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.4))' }} />
                <span style={{ position: 'absolute', left: 16, bottom: 16, color: '#fff', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', textShadow: '0 8px 16px rgba(0,0,0,0.35)' }}>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ background: 'var(--off-white)', padding: '5rem 4vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ marginBottom: '0.8rem' }}>Customer Reviews</div>
            <h2 className="section-title">What our clients <span>are saying</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: '1.2rem' }}>
            {reviews.map((r, i) => (
              <div key={r._id || i} className="card fade-in" style={{ padding: '1.4rem' }}>
                <div style={{ color: '#f5a623', fontSize: '0.9rem', marginBottom: '0.6rem' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.65, marginBottom: '1rem', fontStyle: 'italic' }}>"{r.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 700, fontFamily: "'Playfair Display',serif", flexShrink: 0 }}>
                    {r.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>{r.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: '#fff', padding: '5rem 4vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">We'd love to <span>hear from you</span></h2>
          </div>
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[[MapPin, 'Address', 'No 45, Galle Road,\nColombo 03, Sri Lanka'], [Phone, 'Phone', '+94 77 123 4567'], [Mail, 'Email', 'hello@sparklecleanpro.lk'], [Clock, 'Hours', 'Mon–Sat: 7:00 AM – 8:00 PM\nSunday: 9:00 AM – 5:00 PM']].map(([Icon, label, val]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ background: 'var(--teal-light)', color: 'var(--primary)', width: 42, height: 42, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}><Icon size={18} /></div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--text)', whiteSpace: 'pre-line' }}>{val}</div>
                  </div>
                </div>
              ))}
              <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '12px 24px', borderRadius: 999, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', width: 'fit-content', marginTop: 8 }}>
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
            <div style={{ background: 'var(--teal-light)', borderRadius: 20, overflow: 'hidden', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.60623376288!2d79.7738025!3d6.9218335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1701234567890!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}