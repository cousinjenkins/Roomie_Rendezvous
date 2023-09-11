import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Navbar: React.FC = () => {
  const [universities, setUniversities] = useState<string[]>([]);

  const fetchUniversities = async (query: string) => {
    try {
      console.log(`Fetching from URL: https://universities.hipolabs.com/search?name=${query}`);

      const response = await fetch(`http://localhost:3000/search?name=${query}`);


      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const universityNames = data.map((uni: any) => uni.name);
      setUniversities(universityNames);
    } catch (error) {
      if (error instanceof Error) { // Check if error is an instance of Error
        if (error.message.includes('Failed to fetch')) {
          console.error('Network error. Please check your connection or CORS settings.');
        } else {
          console.error('Error fetching universities:', error);
        }
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };
  
  

  const handleSearchChange = (event: React.ChangeEvent<{}>, value: string) => {
    if (value.length > 2) { // Only search when term is longer than 2 characters for performance reasons.
      fetchUniversities(value);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Roomie Rendezvous</RouterLink>
        </Typography>
        <Autocomplete
          options={universities}
          freeSolo
          onInputChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by University"
              variant="outlined"
              size="small"
            />
          )}
          style={{ flex: 1, margin: '0 15px' }}
        />
        <Button color="inherit" component={RouterLink} to="/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

