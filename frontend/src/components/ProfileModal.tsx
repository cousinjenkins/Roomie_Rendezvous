import React, { useState } from 'react';
import { Modal, TextField, Button, Paper, Box, Typography, MenuItem } from '@mui/material';
import { Profile, Gender } from '../types';

type ProfileModalProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  profile: Profile;  // We're now expecting the whole profile
};

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, profile }) => {
  const [updatedProfile, setUpdatedProfile] = useState<Profile>(profile);

  const handleInputChange = (field: keyof Profile) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProfile(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      if(!token) {
        alert('Not authenticated.');
        return;
      }
      const response = await fetch(`http://localhost:3000/profiles/${profile.profile_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProfile)
      });

      const responseData = await response.json();

      if (response.ok) {
        onClose();
        // Optionally: refresh the page or fetch the updated profile to reflect changes
      } else {
        alert(responseData.message || 'Failed to update profile.');
      }
    } catch (error) {
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-profile-modal"
    >
      <Box 
        component={Paper}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '400px',
          m: 'auto',
          p: 3,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6">Edit Profile</Typography>
        <TextField 
          label="First Name" 
          defaultValue={profile.first_name} 
          onChange={handleInputChange('first_name')} 
          fullWidth 
          margin="normal" 
        />
        <TextField 
          label="Last Name" 
          defaultValue={profile.last_name} 
          onChange={handleInputChange('last_name')} 
          fullWidth 
          margin="normal" 
        />
        <TextField
          select
          label="Gender"
          value={updatedProfile.gender}
          onChange={handleInputChange('gender')}
          fullWidth
          margin="normal"
        >
          {Object.values(Gender).map(gender => (
            <MenuItem key={gender} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </TextField>
        <Box mt={2} alignSelf="flex-end">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProfileModal;

