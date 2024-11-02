import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material';
import { fetchWithAuth } from '../../utils/api';
 
const ContApplications = () => {

    const [applications, setApplications] = useState([]);
  
    useEffect(() => {

      fetchWithAuth(`${import.meta.env.VITE_API_URL}/applications`, {
        method: 'GET'
      })
      .then((res) => {
        if (!res.ok) {
          res.text
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setApplications(data); // Assuming data is an array of app objects
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }, []); // Run only once on component mount  

    return (
      <>
      <h2>My Applications</h2>
      <Stack spacing={4}>
      <hr></hr>
      {applications.map((app, index) => (
        <React.Fragment key={index}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          width="100%"
        >
          <Stack spacing={0.5} alignItems="flex-start">
            <Typography variant="body1">{app.job.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {app.job.company.name}
            </Typography>
          </Stack>
          <Stack spacing={0.5} alignItems="flex-end">
            <Typography variant="body2" color="textSecondary">
              Status: {app.status}
            </Typography>
          </Stack>
        </Stack>
        <hr></hr>
        </React.Fragment>
      ))}
    </Stack>
      </>
    );
}
 
export default ContApplications