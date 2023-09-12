import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUser } from './components/userContext';
import { Profile as UserProfile } from './types'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if(user) {
      // Fetch the current profile only if a user is logged in.
      fetchCurrentProfile();
    }
    setIsLoading(false);
  }, [user]);

  const fetchCurrentProfile = async () => {
    const token = localStorage.getItem('jwt_token'); 
    if (!token) return;

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/profiles/current-profile`, { headers });
      if(response.ok) {
        setCurrentProfile(await response.json());
      }
    } catch (err) {
      console.error("Failed to fetch current profile:", err);
    }
  }

  if (isLoading) return <div>Loading...</div>;

  

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Navbar profile={currentProfile} onUpdateProfile={setCurrentProfile} />
        <Routes>
          <Route path="/login" element={!user ? <Auth /> : <Navigate to={user.isAdmin ? "/adminDashboard" : "/dashboard"} replace />} />
          <Route path="/dashboard" element={user && !user.isAdmin ? <Dashboard currentProfile={currentProfile}/> : <Navigate to="/login" replace />} />
          <Route path="/adminDashboard" element={user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;












