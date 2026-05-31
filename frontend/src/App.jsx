import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceMenu from './pages/ServiceMenu';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserLogin from './pages/UserLogin';

function ProtectedRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div className="spinner" style={{ marginTop: '8rem' }} />;
  return user && isAdmin ? children : <Navigate to="/admin/login" replace />;
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />} />
      <Route path="/services" element={
        <>
          <Navbar />
          <main>
            <ServiceMenu />
          </main>
          <Footer />
        </>
      } />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
      </AuthProvider>
    </BrowserRouter>
  );
}