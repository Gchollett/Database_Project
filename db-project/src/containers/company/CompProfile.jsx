import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    companyID: '',
    name: '',
    username: '',
    email:''
  });

  useEffect(() => {
    // Setting initial company data
    setCompany({
      companyID: '00123',
      name: 'Tech Innovations Ltd.',
      username: 'techinnovations',
      email: 'hire@techinnovations.com',
      first:'Ted',
      last:'Menendez',
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
              <Typography variant="h6">Company ID</Typography>
              <Typography variant="body1">{company.companyID}</Typography>
            </Grid>

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
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Admin First Name</Typography>
              <Typography variant="body1">{company.first}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Admin Last Name</Typography>
              <Typography variant="body1">{company.last}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CompanyProfile;
