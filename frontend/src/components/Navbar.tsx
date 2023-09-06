import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Roomie Rendezvous</RouterLink>
        </Typography>
        <Button color="inherit" component={RouterLink} to="/login">Login</Button>
        {/* Add more buttons or links as necessary */}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

