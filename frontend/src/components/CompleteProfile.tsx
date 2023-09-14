import React, { useState } from 'react';
import { Button, TextField, Container, Paper, Box, Typography, MenuItem, Switch, FormControlLabel, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { Profile, Gender } from '../types';

const CompleteProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<Partial<Profile>>({});

  const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem('jwt_token');
    if (!token) return;

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/profiles`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(profileData)
      });

      if(response.ok) {
        const updatedProfile = await response.json();
        // setCurrentProfile(updatedProfile);
      } else {
        console.error("Failed to update profile:", await response.text());
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  }

  const handleInputChange = (field: keyof Profile) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string | undefined; value: unknown; }>) => {
    setProfileData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleGenderChange = (event: SelectChangeEvent<Gender>) => {
    const value = event.target.value as Gender;
    setProfileData(prev => ({ ...prev, gender: value }));
  };

  const handleSwitchChange = (field: keyof Profile) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({ ...prev, [field]: event.target.checked }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setProfileData(prev => ({ ...prev, date_of_birth: date }));
  };

  const handleMoveDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setProfileData(prev => ({ ...prev, looking_to_move_date: date }));
  };
  
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '10vh' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '15px' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" gutterBottom>
            Complete Your Profile
          </Typography>
          <form onSubmit={handleUpdateProfile}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
              onChange={handleInputChange('first_name')}
              value={profileData.first_name || ''}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              onChange={handleInputChange('last_name')}
              value={profileData.last_name || ''}
            />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                onChange={handleGenderChange}
                value={profileData.gender || ''}
              >
                <MenuItem value={Gender.MALE}>Male</MenuItem>
                <MenuItem value={Gender.FEMALE}>Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="dob"
              label="Date of Birth"
              type="date"
              onChange={handleDateChange}
              value={profileData.date_of_birth instanceof Date ? profileData.date_of_birth.toISOString().split('T')[0] : ''}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="bio"
              label="Bio"
              multiline
              rows={4}
              onChange={handleInputChange('bio')}
              value={profileData.bio || ''}
            />
            <FormControlLabel
              control={<Switch checked={profileData.smoker || false} onChange={handleSwitchChange('smoker')} name="smoker" />}
              label="Smoker"
            />
            <FormControlLabel
              control={<Switch checked={profileData.pet || false} onChange={handleSwitchChange('pet')} name="pet" />}
              label="Has Pet"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="hobbies"
              label="Hobbies"
              onChange={handleInputChange('hobbies')}
              value={profileData.hobbies || ''}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="language_spoken"
              label="Languages Spoken"
              onChange={handleInputChange('language_spoken')}
              value={profileData.language_spoken || ''}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="moveDate"
              label="Looking to Move Date"
              type="date"
              onChange={handleMoveDateChange}
              value={profileData.looking_to_move_date instanceof Date ? profileData.looking_to_move_date.toISOString().split('T')[0] : ''}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="university"
              select
              label="University"
              value={profileData.university || ''}
              onChange={handleInputChange('university')}
            >
              <MenuItem value="Harvard">Harvard</MenuItem>
              <MenuItem value="Stanford">Stanford</MenuItem>
              <MenuItem value="MIT">MIT</MenuItem>
              {/* Add more university options here if needed */}
            </TextField>
            <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '1rem' }}>
              Save
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default CompleteProfile;
