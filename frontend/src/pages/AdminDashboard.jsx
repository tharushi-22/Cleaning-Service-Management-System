import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import {
  LayoutDashboard,
  CalendarCheck,
  BarChart3,
  Settings,
  LogOut,
  RefreshCcw,
  Sparkles,
  ChevronDown,
  Search,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  Menu,
  X,
} from 'lucide-react';

/* ─── Status helpers ─── */
const statusMap = {
  pending:   { label: 'Pending',   bg: '#FEF3C7', color: '#92400E', icon: Clock },
  confirmed: { label: 'Confirmed', bg: '#DBEAFE', color: '#1D4ED8', icon: CalendarCheck },
  completed: { label: 'Completed', bg: '#DCFCE7', color: '#166534', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', bg: '#FEE2E2', color: '#991B1B', icon: XCircle },
};

function StatusChip({ status }) {
  const s = statusMap[status] || { label: status || 'Unknown', bg: '#F1F5F9', color: '#475569', icon: Clock };
  const Icon = s.icon;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 999,
      fontSize: '0.78rem', fontWeight: 600, background: s.bg, color: s.color, letterSpacing: '0.02em',
    }}>
      <Icon size={13} />
      {s.label}
    </span>
  );
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
}

/* ─── Styles ─── */
const S = {
  /* Layout */
  wrapper: {
    display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif",
  },
  sidebar: {
    width: 260, background: 'linear-gradient(195deg, #042f2e 0%, #0d4744 50%, #0a3d3a 100%)',
    display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0,
    zIndex: 100, transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
  },
  sidebarOverlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 99,
    transition: 'opacity 0.3s',
  },
  mainArea: {
    flex: 1, background: '#f5f7fa',
    minHeight: '100vh', transition: 'margin-left 0.3s',
  },
  topbar: {
    position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid #e5e7eb', padding: '0 2rem',
    height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  content: { padding: '1.5rem 2rem 3rem' },

  /* Sidebar internals */
  logo: {
    padding: '1.5rem 1.4rem 1.2rem', borderBottom: '1px solid rgba(255,255,255,0.08)',
    display: 'flex', alignItems: 'center', gap: 10,
  },
  logoText: {
    fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 800, color: '#fff',
    lineHeight: 1.1,
  },
  logoSub: { fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 2 },
  navGroup: { padding: '1.2rem 0.8rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 4 },
  navLabel: {
    fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)',
    letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0 0.8rem', marginBottom: 6, marginTop: 14,
  },
  navItem: (active) => ({
    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10,
    fontSize: '0.88rem', fontWeight: 500, color: active ? '#fff' : 'rgba(255,255,255,0.65)',
    background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
    cursor: 'pointer', transition: 'all 0.2s', border: 'none', width: '100%', textAlign: 'left',
  }),
  userCard: {
    padding: '1rem 1.2rem', borderTop: '1px solid rgba(255,255,255,0.08)',
    display: 'flex', alignItems: 'center', gap: 10,
  },
  avatar: {
    width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
  },

  /* Cards */
  statCard: (accent) => ({
    background: '#fff', borderRadius: 16, padding: '1.4rem 1.5rem',
    border: '1px solid #e5e7eb', position: 'relative', overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
  }),
  statAccent: (accent) => ({
    position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent,
  }),
  tableCard: {
    background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden',
  },
};

/* ─── Main Component ─── */
export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { fetchBookings(); }, []);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/bookings');
      setBookings(data.data || []);
      setStats(data.stats || {});
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, status) => {
    setActionId(id);
    try {
      await api.patch(`/bookings/${id}/status`, { status });
      toast.success('Booking status updated');
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    } finally {
      setActionId(null);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking permanently?')) return;
    setActionId(id);
    try {
      await api.delete(`/bookings/${id}`);
      toast.success('Booking deleted');
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete booking');
    } finally {
      setActionId(null);
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (b.name || '').toLowerCase().includes(q) ||
      (b.email || '').toLowerCase().includes(q) ||
      (b.serviceName || b.service?.name || '').toLowerCase().includes(q) ||
      (b.phone || '').includes(q)
    );
  });

  const statCards = [
    { label: 'Total Bookings', value: stats.total ?? bookings.length, accent: '#0D9488', icon: CalendarCheck, change: '+12%' },
    { label: 'Pending', value: stats.pending ?? 0, accent: '#F59E0B', icon: Clock, change: null },
    { label: 'Completed', value: stats.completed ?? 0, accent: '#16A34A', icon: CheckCircle2, change: '+8%' },
    { label: 'Cancelled', value: stats.cancelled ?? 0, accent: '#EF4444', icon: XCircle, change: null },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const initials = (user?.name || 'A').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div style={S.wrapper}>
      {/* ─── Mobile overlay ─── */}
      {sidebarOpen && (
        <div style={S.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* ─── Sidebar ─── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`} style={S.sidebar}>
        {/* Logo */}
        <div style={S.logo}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Sparkles size={20} color="#fff" />
          </div>
          <div>
            <div style={S.logoText}>SparkleClean</div>
            <div style={S.logoSub}>Admin Panel</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={S.navGroup}>
          <div style={S.navLabel}>Main Menu</div>
          {navItems.map(item => (
            <button
              key={item.id}
              style={S.navItem(activeNav === item.id)}
              onClick={() => setActiveNav(item.id)}
              onMouseEnter={e => {
                if (activeNav !== item.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={e => {
                if (activeNav !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                }
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}

          <div style={S.navLabel}>Shortcuts</div>
          <button
            style={S.navItem(false)}
            onClick={fetchBookings}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
          >
            <RefreshCcw size={18} />
            Refresh Data
          </button>
        </nav>

        {/* User / Logout */}
        <div style={S.userCard}>
          <div style={S.avatar}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'Admin'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>
              {user?.email || 'admin@example.com'}
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            style={{
              background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8,
              padding: 7, cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.25)'; e.currentTarget.style.color = '#fca5a5'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <div className="admin-main" style={S.mainArea}>
        {/* Top Bar */}
        <header className="admin-topbar" style={S.topbar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              className="admin-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#374151', padding: 4,
              }}
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            {/* Search */}
            <div className="admin-search" style={{
              display: 'flex', alignItems: 'center', gap: 8, background: '#f3f4f6',
              borderRadius: 10, padding: '8px 14px', transition: 'all 0.2s',
            }}>
              <Search size={16} color="#9ca3af" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  border: 'none', background: 'transparent', outline: 'none',
                  fontSize: '0.88rem', color: '#111827', width: '100%',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{
              background: '#f3f4f6', border: 'none', borderRadius: 10,
              padding: 8, cursor: 'pointer', color: '#6b7280', display: 'flex',
              alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}>
              <Bell size={18} />
              {(stats.pending ?? 0) > 0 && (
                <span style={{
                  position: 'absolute', top: 3, right: 3, width: 8, height: 8,
                  borderRadius: '50%', background: '#ef4444', border: '2px solid #fff',
                }} />
              )}
            </button>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, background: '#f3f4f6',
              borderRadius: 10, padding: '6px 12px 6px 6px', cursor: 'pointer',
            }}>
              <div style={{ ...S.avatar, width: 30, height: 30, fontSize: '0.72rem' }}>{initials}</div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>{user?.name || 'Admin'}</span>
              <ChevronDown size={14} color="#9ca3af" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content" style={S.content}>
          {/* Page heading */}
          <div style={{ marginBottom: '1.8rem' }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 800,
              color: '#111827', marginBottom: 6,
            }}>
              Dashboard
            </h1>
            <p style={{ fontSize: '0.92rem', color: '#6b7280', lineHeight: 1.5 }}>
              Welcome back, <strong>{user?.name || 'Admin'}</strong>. Here's what's happening with your cleaning services today.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="admin-stats-grid">
            {statCards.map(card => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  style={S.statCard(card.accent)}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={S.statAccent(card.accent)} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                        {card.label}
                      </p>
                      <p style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', lineHeight: 1, marginBottom: 4 }}>
                        {card.value}
                      </p>
                      {card.change && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
                          <TrendingUp size={12} /> {card.change}
                        </span>
                      )}
                    </div>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `${card.accent}15`, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={22} color={card.accent} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bookings Table */}
          <div style={S.tableCard}>
            {/* Table header */}
            <div style={{
              padding: '1.2rem 1.5rem', borderBottom: '1px solid #e5e7eb',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem',
            }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: 3 }}>
                  Recent Bookings
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
                  {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <button
                onClick={fetchBookings}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '8px 16px', borderRadius: 10, border: '1px solid #e5e7eb',
                  background: '#fff', fontSize: '0.82rem', fontWeight: 600,
                  color: '#374151', cursor: 'pointer', transition: 'all 0.2s',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#d1d5db'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
              >
                <RefreshCcw size={14} />
                Refresh
              </button>
            </div>

            {/* Table */}
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['Service', 'Customer', 'Contact', 'Schedule', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{
                        padding: '12px 16px', fontSize: '0.75rem', fontWeight: 600,
                        color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em',
                        textAlign: 'left', borderBottom: '1px solid #e5e7eb',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                      <div className="spinner" style={{ margin: '0 auto 1rem' }} />
                      Loading bookings…
                    </td></tr>
                  ) : filteredBookings.length === 0 ? (
                    <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                      <CalendarCheck size={32} color="#d1d5db" style={{ margin: '0 auto 0.75rem' }} />
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>No bookings found</div>
                      <div style={{ fontSize: '0.85rem' }}>
                        {searchQuery ? 'Try adjusting your search query.' : 'Bookings will appear here once customers submit requests.'}
                      </div>
                    </td></tr>
                  ) : filteredBookings.map((booking, i) => (
                    <tr
                      key={booking._id}
                      style={{
                        borderBottom: '1px solid #f3f4f6',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td data-label="Service" style={cellStyle}>
                        <div style={{ fontWeight: 600, color: '#111827', marginBottom: 3 }}>
                          {booking.serviceName || booking.service?.name}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#9ca3af' }}>{booking.address}</div>
                      </td>
                      <td data-label="Customer" style={cellStyle}>
                        <div style={{ fontWeight: 600, color: '#111827', marginBottom: 3 }}>{booking.name}</div>
                        <div style={{ fontSize: '0.82rem', color: '#9ca3af' }}>{booking.email}</div>
                      </td>
                      <td data-label="Contact" style={cellStyle}>
                        <div style={{ color: '#374151' }}>{booking.phone}</div>
                        <div style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: 3 }}>{booking.notes || '—'}</div>
                      </td>
                      <td data-label="Schedule" style={cellStyle}>
                        <div style={{ fontWeight: 500, color: '#374151' }}>{booking.date} @ {booking.time}</div>
                        <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: 3 }}>{formatDate(booking.createdAt)}</div>
                      </td>
                      <td data-label="Status" style={cellStyle}>
                        <StatusChip status={booking.status} />
                      </td>
                      <td data-label="Actions" style={cellStyle}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {booking.status !== 'completed' && (
                            <button
                              onClick={() => updateBookingStatus(booking._id, 'completed')}
                              disabled={actionId === booking._id}
                              style={{
                                padding: '6px 12px', borderRadius: 8, border: 'none',
                                background: '#059669', color: '#fff', fontSize: '0.78rem',
                                fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                                fontFamily: "'DM Sans', sans-serif", opacity: actionId === booking._id ? 0.6 : 1,
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = '#047857'}
                              onMouseLeave={e => e.currentTarget.style.background = '#059669'}
                            >
                              {actionId === booking._id ? '...' : '✓ Complete'}
                            </button>
                          )}
                          <button
                            onClick={() => deleteBooking(booking._id)}
                            disabled={actionId === booking._id}
                            style={{
                              padding: '6px 12px', borderRadius: 8,
                              border: '1px solid #fecaca', background: '#fff',
                              color: '#dc2626', fontSize: '0.78rem', fontWeight: 600,
                              cursor: 'pointer', transition: 'all 0.2s',
                              fontFamily: "'DM Sans', sans-serif", opacity: actionId === booking._id ? 0.6 : 1,
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
                          >
                            {actionId === booking._id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            {!loading && filteredBookings.length > 0 && (
              <div style={{
                padding: '12px 16px', borderTop: '1px solid #e5e7eb',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontSize: '0.82rem', color: '#9ca3af',
              }}>
                <span>Showing {filteredBookings.length} of {bookings.length} entries</span>
                <span>Last refreshed: {new Date().toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const cellStyle = {
  padding: '14px 16px', verticalAlign: 'top', fontSize: '0.88rem',
};
