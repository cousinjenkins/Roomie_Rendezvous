import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ProfileModal from './ProfileModal';
import { useUser } from './userContext';
import { Profile } from '../types'


const Navbar: React.FC = () => { 
  const [universities, setUniversities] = useState<string[]>([]);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const { user, profile } = useUser(); 

  const isProfileComplete = (profile: Profile | null): boolean => {
    if (!profile) return false;
    const requiredFields = ["first_name", "last_name", "gender", "bio", "date_of_birth", "hobbies", "language_spoken", "looking_to_move_date", "pet", "smoker", "university"];
    return requiredFields.every(field => Boolean(profile[field as keyof Profile]));
  };

  const fetchUniversities = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:3000/search?name=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const universityNames = data.map((uni: any) => uni.name);
      setUniversities(universityNames);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<{}>, value: string) => {
    if (value.length > 2) {
      fetchUniversities(value);
    }
  };

  const handleProfileClick = () => {
    setProfileModalOpen(true);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Roomie Rendezvous
            </RouterLink>
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
            style={{ flex: 'none', width: '250px', margin: '0 15px' }}
          />
          {user ? (
            <>
              <Button color="inherit" onClick={handleProfileClick}>
                {user.username}
              </Button>
              {/* Only show 'Complete Profile' button if profile is not complete */}
              {!isProfileComplete(profile) && (
                <Button color="inherit" component={RouterLink} to="/completeProfile">
                  Complete Profile
                </Button>
              )}
              {user && profile && (
  <ProfileModal
    open={isProfileModalOpen}
    onClose={() => setProfileModalOpen(false)}
    name={user.username}
    profile={profile}
  />
)}

            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;






