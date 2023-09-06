import React, { useEffect, useState } from 'react';
import { Profile } from '../types';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

const ProfileListing: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/profiles/profiles`);
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
      <Typography variant="h4" gutterBottom>Profiles</Typography>

      <Grid container spacing={3}>
        {profiles.map(profile => (
          <Grid item xs={12} sm={6} md={4} key={profile.profile_id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{profile.first_name} {profile.last_name}</Typography>
                <Typography variant="body2" color="textSecondary">{profile.bio}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProfileListing;
