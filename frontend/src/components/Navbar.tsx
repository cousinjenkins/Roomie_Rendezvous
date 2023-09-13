import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ProfileModal from './ProfileModal';
import { Profile } from '../types';

type NavbarProps = {
  profile: Profile | null;
  onUpdateProfile: (updatedProfile: Profile) => void;
};

const Navbar: React.FC<NavbarProps> = ({ profile, onUpdateProfile}) => {
  const [universities, setUniversities] = useState<string[]>([]);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

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
          {profile ? (
            <>
              <Button color="inherit" onClick={handleProfileClick}>
                {profile.first_name}
              </Button>
              <Button color="inherit" component={RouterLink} to="/completeProfile">
                Complete Profile
              </Button>
              <ProfileModal
                open={isProfileModalOpen}
                onClose={() => setProfileModalOpen(false)}
                name={profile.first_name}
                profile={profile}
                onUpdate={onUpdateProfile}
              />
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





