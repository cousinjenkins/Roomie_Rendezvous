import React, { useState } from 'react';
import { Button, TextField, Grid, MenuItem, Paper, Typography} from '@mui/material';
import { Profile } from '../types';

type UpdateProfileProps = {
    profile: Profile;
    onUpdateSuccess: (updatedProfile: Profile) => void;
};

const UpdateProfile: React.FC<UpdateProfileProps> = ({ profile, onUpdateSuccess }) => {
    const [updatedProfile, setUpdatedProfile] = useState<Profile>(profile);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let finalValue: string | boolean = value;

        if (name === "smoker" || name === "pet") {
            finalValue = value === "true" ? true : false;
        }

        setUpdatedProfile(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleUpdateProfile = async () => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/profiles/${profile.profile_id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfile),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile.');
            }

            const data: Profile = await response.json();
            onUpdateSuccess(data); // Notify parent component about the successful update
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '800px' }}>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>Update Profile</Typography>

            <Grid container spacing={3}>
                {/* Splitting your fields into two columns for better appearance */}
                <Grid item xs={6}>
                    <TextField name="first_name" label="First Name" value={updatedProfile.first_name} onChange={handleInputChange} fullWidth />
                    <TextField name="last_name" label="Last Name" value={updatedProfile.last_name} onChange={handleInputChange} fullWidth />
                    <TextField name="gender" label="Gender" value={updatedProfile.gender} onChange={handleInputChange} fullWidth />
                    <TextField name="date_of_birth" label="Date of Birth" type="date" value={updatedProfile.date_of_birth} onChange={handleInputChange} InputLabelProps={{ shrink: true }} fullWidth />
                    <TextField name="bio" label="Bio" value={updatedProfile.bio} onChange={handleInputChange} multiline fullWidth />
                </Grid>

                <Grid item xs={6}>
                    <TextField name="university" label="University" value={updatedProfile.university} onChange={handleInputChange} fullWidth />
                    <TextField name="language_spoken" label="Languages Spoken" value={updatedProfile.language_spoken} onChange={handleInputChange} fullWidth />
                    <TextField name="hobbies" label="Hobbies" value={updatedProfile.hobbies} onChange={handleInputChange} fullWidth />
                    <TextField name="smoker" label="Smoker" select value={String(updatedProfile.smoker)} onChange={handleInputChange} fullWidth>
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                    </TextField>
                    <TextField name="pet" label="Has Pet" select value={String(updatedProfile.pet)} onChange={handleInputChange} fullWidth>
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                    </TextField>
                    <TextField name="looking_to_move_date" label="Looking to Move Date" type="date" value={updatedProfile.looking_to_move_date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleUpdateProfile} style={{ float: 'right' }}>
                        Update Profile
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UpdateProfile;
