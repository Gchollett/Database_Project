import { useState, useEffect } from 'react';
import { Stack, Typography, TextField, Paper, Grid, Chip } from '@mui/material';

const ContJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // or however you're storing the token

    fetch(`${import.meta.env.VITE_API_URL}/applications/accepted`, {
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
    .then(data => setJobs(data)) // Assuming data is an array of job objects
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []); // Run only once on component mount

  // Sort and filter jobs based on the search query
  useEffect(() => {
    const searchLower = searchQuery.toLowerCase();

    // Filter jobs by title or company, and sort them by start date
    const filtered = jobs
      .filter((jobData) => {
        const job = jobData.job; // Destructure the job object
        return (
          job.title.toLowerCase().includes(searchLower) ||
          job.company?.name?.toLowerCase().includes(searchLower) ||
          job.jobtag?.some(tag => tag.name.toLowerCase().includes(searchLower))
        );
      })
      .sort((a, b) => new Date(a.job.start) - new Date(b.job.start)); // Sort by start date

    setFilteredJobs(filtered);
  }, [searchQuery, jobs]);

  return (
    <>
      <h2>My Jobs</h2>
      <Stack spacing={3}>
        {/* Search input */}
        <TextField
          fullWidth
          label="Search by Title, Company, or Tags"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Job list */}
        {filteredJobs.map((jobData) => {
          const job = jobData.job; // Destructure the job object
          return (
            <Paper key={job.jobid} sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Stack spacing={1} alignItems="flex-start">
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Company: {job.company?.name}
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
                      {job.jobtag?.map((tag, index) => (
                        <Chip key={index} label={tag.name} variant="outlined" />
                      ))}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </Stack>
      <br /><br /><br /><br />
    </>
  );
};

export default ContJobs;
