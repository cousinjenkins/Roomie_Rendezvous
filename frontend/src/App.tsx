import React from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';  // A hypothetical Dashboard component.
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfileListing from './components/ProfileListing';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a dark theme instance
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // This will set the theme mode to dark
  },
});

const App: React.FC = () => {
  // Here's a simple check for auth status. In a real-world scenario, 
  // you might check for a valid authentication token.
  const isAuthenticated = false;  // This will be dynamic based on your auth mechanism.

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Navbar /> {/* Navbar added here to be shown on all routes */}
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/" element={<ProfileListing />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;







