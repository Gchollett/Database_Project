import React, { useEffect, useState } from 'react'
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';

 
const ContProfile = () => {

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [username, setUsername] = useState('');
    const [rate,setRate] = useState(0);
    const [resume, setResume] = useState('');

    useEffect(() => {
        setFirst('Mary')
        setLast('Phillips')
        setUsername('mphillip')
        setRate(30)
        setResume('...')
    })

  return (
    <Box mt={4}>
    <Card variant="plain">
      <CardContent>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">First Name</Typography>
            <Typography variant="body1">{first}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Last Name</Typography>
            <Typography variant="body1">{last}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Username</Typography>
            <Typography variant="body1">{username}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Rate ($/hr)</Typography>
            <Typography variant="body1">{rate}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Resume</Typography>
            <Typography variant="body1">{resume}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Box>
  );
}
 
export default ContProfile