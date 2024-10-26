import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, Box, Chip } from '@mui/material';

const ContProfile = () => {
  const [profile, setProfile] = useState({
    userID: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    rate: 0,
    resume: '',
    tags: [], // Added tags property
  });

  useEffect(() => {
    // Setting initial profile data
    setProfile({
      userID: 'U123456',
      firstName: 'Mary',
      lastName: 'Phillips',
      username: 'mphillip',
      email: 'mphillip@trinity.edu',
      rate: 30,
      resume: '...',
      tags: ['React', 'JavaScript', 'Web Development', 'CSS'], // Sample tags
    });
  }, []); // Empty dependency array to run only once

  return (
    <>
      <Box mt={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4" gutterBottom>
              My Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">User ID</Typography>
                <Typography variant="body1">{profile.userID}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6">First Name</Typography>
                <Typography variant="body1">{profile.firstName}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Last Name</Typography>
                <Typography variant="body1">{profile.lastName}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Username</Typography>
                <Typography variant="body1">{profile.username}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Email</Typography>
                <Typography variant="body1">{profile.email}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Rate ($/hr)</Typography>
                <Typography variant="body1">{profile.rate}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Resume</Typography>
                <Typography variant="body1">{profile.resume}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Tags</Typography>
                <Box mt={1}>
                  {profile.tags.map((tag, index) => (
                    <Chip key={index} label={tag} variant="outlined" sx={{ marginRight: 1, marginBottom: 1 }} />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default ContProfile;
