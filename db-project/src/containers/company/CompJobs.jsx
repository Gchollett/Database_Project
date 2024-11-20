import React, { useState, useEffect } from 'react';
import { Stack, Typography, TextField, Paper, Grid, Chip } from '@mui/material';

const CompJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobs, setJobs] = useState([]);

  // Fetch jobs
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // or however you're storing the token

    fetch(`${import.meta.env.VITE_API_URL}/jobs`, {
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
    .then(data => setJobs(data)) // Assuming data is an array of jobs
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []); // Run only once on component mount

  // Filter jobs based on search query
  useEffect(() => {
    const searchLower = searchQuery.toLowerCase();

    // Filter jobs by title or tags, and sort them by start date
    const filtered = jobs
      .filter((job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.jobtag.some(tag => tag.name.toLowerCase().includes(searchLower)) 
      )
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); // Sort by start date

    setFilteredJobs(filtered);
  }, [jobs, searchQuery]); // Run whenever jobs or searchQuery changes

  return (
    <>
      <h2>My Jobs</h2>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Search by Title, Description, or Tags"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredJobs.map((job) => (
          <Paper key={job.jobid} sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Stack spacing={1} alignItems="flex-start">
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Job ID: {job.jobid}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {job.remote ? 'Remote: Yes' : 'Remote: No'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Start Date: {new Date(job.start).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    End Date: {new Date(job.end).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Pay: ${job.pay}/hr
                  </Typography>
                  <Typography variant="body2">{job.description}</Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                  {job.jobtag.map((tag, index) => (
                    <Chip key={index} label={tag.name} variant="outlined" />
                  ))}
                </Stack>
                  {(job.jobapplication.length > 0) ? (
                    <Stack spacing={1} mt={2} sx={{ backgroundColor: '#f9f9f9', padding: 1, borderRadius: 1 }}>
                      <Typography variant="subtitle2" color="textPrimary">
                        Status: Filled
                      </Typography>
                      <Typography variant="body2">
                        Contractor: {job.jobapplication[0].contractor.firstname} {job.jobapplication[0].contractor.lastname}
                      </Typography>
                      <Typography variant="body2">
                        {job.jobapplication[0].contractor.User.email}
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography variant="subtitle2" color="textSecondary" mt={2}>
                      Status: Open
                    </Typography>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Stack>
      <br /><br /><br /><br /><br />
    </>
  );
};

export default CompJobs;
