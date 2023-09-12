import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2>Edit Profile</h2>
        <TextField label="First Name" defaultValue={profile.first_name} onChange={handleInputChange('first_name')} fullWidth margin="normal" />
        <TextField label="Last Name" defaultValue={profile.last_name} onChange={handleInputChange('last_name')} fullWidth margin="normal" />
        <TextField
          select
          label="Gender"
          value={updatedProfile.gender}
          onChange={handleInputChange('gender')}
          SelectProps={{
            native: true,
          }}
          fullWidth
          margin="normal"
        >
          {Object.values(Gender).map(gender => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </TextField>
        {/* You can continue adding other fields similarly */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;

