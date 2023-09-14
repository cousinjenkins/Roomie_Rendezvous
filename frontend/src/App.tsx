import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUser } from './components/userContext';
import { Profile as UserProfile } from './types'
import MainPage from './components/MainPage'
import CompleteProfile from './components/CompleteProfile';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);

  // useEffect(() => {
  //   if(user) {
  //     fetchCurrentProfile();
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [user]);

  const fetchCurrentProfile = async () => {
    const token = localStorage.getItem('jwt_token'); 
    if (!token) return;
  
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/profiles/current-profile`, { headers });
      if(response.ok) {
        const profile = await response.json();
        setHasProfile(Boolean(profile));
        setCurrentProfile(profile);
      } else {
        const errorData = await response.json();
        if (errorData.message === "Current user profile not found") {
          // If profile doesn't exist, set hasProfile to false
          setHasProfile(false);
          // Navigate to the complete profile page if no profile is found
          window.location.href = "/completeProfile";
        } else {
          console.error("Failed to fetch current profile:", errorData.message);
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch current profile:", err);
      setIsLoading(false);
    }
  }


  if (isLoading) return <div>Loading...</div>;

  return (
    <>
    {/* {currentProfile} */}
    <ThemeProvider theme={darkTheme}>
      <Router>
      <Navbar /> 
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard" element={user && !user.isAdmin ? <Dashboard currentProfile={currentProfile} /> : <Navigate to="/login" replace />} />
          <Route path="/adminDashboard" element={user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/login" replace />} />
          <Route path="/completeProfile" element={<CompleteProfile />} />
        </Routes> 
      </Router>
    </ThemeProvider></>
  );
}

export default App;

// <Navbar profile={currentProfile} onUpdateProfile={handleUpdateProfile} /> 

          // <Route path="/login" element={
          //   !user ? <Auth /> : (hasProfile === false ? <Navigate to="/completeProfile" replace /> : <Navigate to={user.isAdmin ? "/adminDashboard" : "/dashboard"} replace />)
          // } />











