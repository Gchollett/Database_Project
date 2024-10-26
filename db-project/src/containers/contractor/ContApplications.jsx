import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material';
 
const ContApplications = () => {

    const [jobs, setJobs] = useState([]);
  
    useEffect(() => {
        setJobs([
          {
            title: 'Software Engineer',
            status: 'Pending',
            company: 'DWC Consulting Group',
            applicationDate: '2023-10-15',
          },
          {
            title: 'Product Manager',
            status: 'Pending',
            company: 'Korma Technologies',
            applicationDate: '2023-10-20',
          },
          {
            title: 'Web Developer',
            status: 'Rejected',
            company: 'Royona',
            applicationDate: '2023-10-20',
          },
        ])
      
    })

    return (
      <>
      <h2>My Applications</h2>
      <Stack spacing={4}>
      <hr></hr>
      {jobs.map((job, index) => (
        <>
        <Stack
          key={index}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          width="100%"
        >
          <Stack spacing={0.5} alignItems="flex-start">
            <Typography variant="body1">{job.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {job.company}
            </Typography>
          </Stack>
          <Stack spacing={0.5} alignItems="flex-end">
            <Typography variant="body2" color="textSecondary">
              Status: {job.status}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Application Date: {job.applicationDate}
            </Typography>
          </Stack>
        </Stack>
        <hr></hr>
        </>
      ))}
    </Stack>
      </>
    );
}
 
export default ContApplications