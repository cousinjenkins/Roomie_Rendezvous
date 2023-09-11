// app.tsx

import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfileListing from './components/ProfileListing';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUser } from './components/userContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
      setIsLoading(false);
  }, []);

  if (user) {
    console.log('Is user admin?', user.isAdmin);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <ThemeProvider theme={darkTheme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={!user ? <Auth /> : <Navigate to={user.isAdmin ? "/adminDashboard" : "/dashboard"} replace />} />
            <Route path="/dashboard" element={user && !user.isAdmin ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path="/adminDashboard" element={user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/login" replace />} />
            <Route path="/" element={<ProfileListing />} />
          </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;












