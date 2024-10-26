import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';

const ContProfile = () => {
  const [profile, setProfile] = useState({
    userID: '',
    firstName: '',
    lastName: '',
    username: '',
    email:'',
    rate: 0,
    resume: '',
  });

  useEffect(() => {
    // Setting initial profile data
    setProfile({
      userID: 'U123456',
      firstName: 'Mary',
      lastName: 'Phillips',
      username: 'mphillip',
      email:'mphillip@trinity.edu',
      rate: 30,
      resume: '...'
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
          </Grid>
        </CardContent>
      </Card>
    </Box>
     </>
  );
}

export default ContProfile;
