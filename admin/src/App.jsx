import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import CreateProject from './pages/CreateProject';

const Layout = ({ children }) => {
  return (
    <div>
      <nav style={{ padding: '1rem', background: '#333', color: 'white' }}>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem', margin: 0 }}>
          <li><Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link></li>
          <li><Link to="/employees" style={{ color: 'white' }}>Employees</Link></li>
          <li><Link to="/create-project" style={{ color: 'white' }}>Create Project</Link></li>
          <li style={{ marginLeft: 'auto' }}><Link to="/login" onClick={() => localStorage.removeItem('admin_token')} style={{ color: 'white' }}>Logout</Link></li>
        </ul>
      </nav>
      {children}
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  if (!token) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
        <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
