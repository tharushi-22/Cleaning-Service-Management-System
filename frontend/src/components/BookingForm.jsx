import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api';

// Using native time input instead of a preset dropdown

export default function BookingForm({ preselectedService, services, onSuccess }) {
  const [form, setForm] = useState({ service: '', date: '', time: '', name: '', phone: '', email: '', address: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (preselectedService) setForm(f => ({ ...f, service: preselectedService._id }));
  }, [preselectedService]);

  const minDate = () => {
    const d = new Date(); d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const validate = () => {
    const e = {};
    if (!form.service) e.service = 'Please select a service';
    if (!form.date) e.date = 'Date is required';
    if (!form.time) e.time = 'Time is required';
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.address.trim()) e.address = 'Address is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await api.post('/bookings', form);
      setSuccess(true);
      setForm({ service: '', date: '', time: '', name: '', phone: '', email: '', address: '', notes: '' });
      toast.success('🎉 Booking confirmed! We\'ll be in touch shortly.');
      // Auto-close the booking modal after a brief delay
      if (onSuccess) {
        setTimeout(() => {
          setSuccess(false);
          onSuccess();
        }, 500);
      } else {
        setTimeout(() => setSuccess(false), 6000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%', padding: '8px 10px', border: `1.25px solid ${errors[field] ? '#e74c3c' : 'var(--border)'}`,
    borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'var(--text)',
    background: '#fff', outline: 'none', transition: 'border-color 0.18s',
  });

  const errStyle = { color: '#c0392b', fontSize: '0.76rem', marginTop: 3 };
  const labelStyle = { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-mid)', marginBottom: 5 };

  return (
    <>
      <div style={{ background: 'var(--off-white)', borderRadius: 10, padding: '1rem 1.2rem', border: '1px solid var(--border)', maxWidth: 520, width: '100%', margin: '0 auto', overflow: 'visible' }}>
        {success && (
          <div style={{ background: '#e0f7f5', border: '1px solid var(--teal)', borderRadius: 12, padding: '1rem 1.2rem', marginBottom: '1.2rem', color: 'var(--primary-dark)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 10 }}>
            <CheckCircle2 size={20} /> Booking confirmed! We'll reach out to confirm your appointment.
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Service *</label>
            <select name="service" value={form.service} onChange={handleChange} style={inputStyle('service')}>
              <option value="">— Select a service —</option>
              {services.map(s => <option key={s._id} value={s._id}>{s.emoji} {s.name} — ${s.price}{s.unit}</option>)}
            </select>
            {errors.service && <div style={errStyle}>{errors.service}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
            <div>
              <label style={labelStyle}>Date *</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} min={minDate()} style={inputStyle('date')} />
              {errors.date && <div style={errStyle}>{errors.date}</div>}
            </div>
            <div>
              <label style={labelStyle}>Time *</label>
              <input type="time" name="time" value={form.time} onChange={handleChange} min="07:00" max="17:00" step="900" style={inputStyle('time')} />
              {errors.time && <div style={errStyle}>{errors.time}</div>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" style={inputStyle('name')} />
              {errors.name && <div style={errStyle}>{errors.name}</div>}
            </div>
            <div>
              <label style={labelStyle}>Phone *</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 555 000 0000" style={inputStyle('phone')} />
              {errors.phone && <div style={errStyle}>{errors.phone}</div>}
            </div>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@email.com" style={inputStyle('email')} />
            {errors.email && <div style={errStyle}>{errors.email}</div>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Address *</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={2} placeholder="123 Main Street, City, State, ZIP" style={{ ...inputStyle('address'), resize: 'vertical', minHeight: 56 }} />
            {errors.address && <div style={errStyle}>{errors.address}</div>}
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Special Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Pet allergies, access instructions, specific areas..." style={{ ...inputStyle('notes'), resize: 'vertical', minHeight: 48 }} />
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '10px 12px', background: loading ? 'var(--text-muted)' : 'var(--primary)',
            color: '#fff', border: 'none', borderRadius: 10, fontSize: '0.95rem', fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.18s', fontFamily: "'DM Sans', sans-serif",
          }}>
            {loading ? 'Submitting...' : 'Confirm Booking'}
          </button>
        </form>
        <style>{`@media(max-width:600px){ form > div:nth-child(2), form > div:nth-child(3) { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </>
  );
}