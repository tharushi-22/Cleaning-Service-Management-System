import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import ServiceCard from '../components/ServiceCard';
// Fallback images for services if backend does not provide one
const SERVICE_IMAGES = {
  'Deep Cleaning': 'https://www.restorations-uk.com/wp-content/uploads/2026/02/deep-clean-shutterstock_1695842029-med.jpg',
  'Office Cleaning': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
  'Sofa Cleaning': 'https://interwood.pk/cdn/shop/files/Majestic-Sofa-gv-2s_jpg.jpg?v=1778744034',
  // add more as needed
};

// Helper to get an image for a service, falling back to SERVICE_IMAGES or placeholders
const getServiceImage = (service, index) => {
  if (service.image) return service.image;
  if (SERVICE_IMAGES[service.name]) return SERVICE_IMAGES[service.name];
  const placeholders = [
    'https://images.unsplash.com/photo-1600185365590-5926f2e5e2bf?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1582719478188-98ab6e6572c1?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1590487985499-3c5671446a4f?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=60',
  ];
  return placeholders[index % placeholders.length];
};
import BookingForm from '../components/BookingForm';

export default function ServiceMenu() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/services')
      .then(({ data }) => {
        const loaded = data.data.map((service, index) => ({
          ...service,
          imgSrc: service.image || getServiceImage(service, index),
        }));
        setServices(loaded);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const state = location.state || {};
    if (state.service) {
      setSelectedService(state.service);
      setModalOpen(true);
      navigate('/services', { replace: true, state: {} });
      return;
    }

    if (state.serviceId && services.length) {
      const service = services.find((item) => item._id === state.serviceId);
      if (service) {
        setSelectedService(service);
        setModalOpen(true);
        navigate('/services', { replace: true, state: {} });
      }
    }
  }, [location.state, services, navigate]);

  const openBooking = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeBooking = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section style={{ minHeight: '100vh', padding: '6rem 4vw', background: '#f5f7f6' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label">Service Menu</div>
          <h1 className="section-title">Browse our <span>Live Cleaning Catalogue</span></h1>
          <p className="section-sub">Choose from our professional cleaning services designed to keep your home and workspace fresh, spotless, and stress-free.</p>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : (
          <div className="service-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' }}>
            {services.map((service, index) => (
              <ServiceCard key={service._id} service={service} index={index} onBook={() => openBooking(service)} />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1400, background: 'rgba(15, 23, 42, 0.65)', display: 'grid', placeItems: 'center', padding: '1.5rem' }}>
          <div style={{ width: '100%', maxWidth: 760, maxHeight: 'calc(100vh - 3rem)', overflowY: 'auto', borderRadius: 28, background: '#fff', padding: '2rem', position: 'relative', boxShadow: '0 32px 80px rgba(15, 23, 42, 0.2)' }}>
            <button onClick={closeBooking} style={{ position: 'absolute', top: 18, right: 18, width: 40, height: 40, borderRadius: 999, background: 'var(--bg)', border: 'none', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', cursor: 'pointer' }}>×</button>
            <div style={{ marginBottom: '1rem' }}>
              <div className="section-label">Book Service</div>
            </div>
            <BookingForm preselectedService={selectedService} services={services} onSuccess={closeBooking} />
          </div>
        </div>
      )}
    </section>
  );
}
