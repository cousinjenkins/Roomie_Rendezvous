import React, { useEffect, useState } from 'react';
import { Profile } from '../types';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

type DashboardProps = {
  currentProfile: Profile | null;
  // onUpdateProfile: (updatedProfile: Profile) => void; 
};

const Dashboard: React.FC<DashboardProps> = ({ currentProfile }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const token = localStorage.getItem('jwt_token'); 
      if (!token) {
        setError('Token not found. Please login again.');
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/profiles/profiles`, { headers });
        if (!response.ok) {
          throw new Error("Failed to fetch profiles.");
        }
        const data: Profile[] = await response.json();
        setProfiles(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred.');
        }
      }
    };

    fetchProfiles();
  }, []);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {profiles.map(profile => (
          <Grid item xs={12} sm={6} md={4} key={profile.profile_id}>
            <Card> 
              <CardContent>
                <Typography variant="h6">{profile.first_name} {profile.last_name}</Typography>
                <Typography variant="subtitle1">{profile.gender}</Typography>
                <Typography variant="body2">{new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear()} years old</Typography>
                {profile.bio && <Typography variant="body2" color="textSecondary">{profile.bio}</Typography>}
                <Typography variant="body2"><strong>University:</strong> {profile.university}</Typography>
                {profile.language_spoken && <Typography variant="body2"><strong>Languages:</strong> {profile.language_spoken}</Typography>}
                {profile.hobbies && <Typography variant="body2"><strong>Hobbies:</strong> {profile.hobbies}</Typography>}
                <Typography variant="body2"><strong>Smoker:</strong> {profile.smoker ? "Yes" : "No"}</Typography>
                <Typography variant="body2"><strong>Has Pet:</strong> {profile.pet ? "Yes" : "No"}</Typography>
                {profile.looking_to_move_date && <Typography variant="body2"><strong>Looking to move on:</strong> {new Date(profile.looking_to_move_date).toLocaleDateString()}</Typography>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;



