import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    name: '',
    username: '',
    email:''
  });
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // or however you're storing the token

    fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data =>  setCompany({
        name: data.company[0].name,
        username: data.username,
        email: data.email,
      }))
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []); // Empty dependency array to run only once

  return (
    <Box mt={4}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Company Profile
          </Typography>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Company Name</Typography>
              <Typography variant="body1">{company.name}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Username</Typography>
              <Typography variant="body1">{company.username}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Email</Typography>
              <Typography variant="body1">{company.email}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CompanyProfile;
