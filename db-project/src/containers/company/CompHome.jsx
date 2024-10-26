import React, { useState, useEffect } from 'react';
import { Stack, Typography, TextField, Paper, Grid, Chip } from '@mui/material';

// Sample job data with contractor information
const jobs = [
  {
    jobId: '12345',
    title: 'Software Engineer',
    company: 'TechCorp',
    isRemote: true,
    startDate: '2023-11-01 09:00 AM',
    endDate: '2024-05-01 05:00 PM',
    pricePerHour: 50,
    description: 'As a Software Engineer, you will develop high-quality software solutions. You will collaborate with cross-functional teams to define and implement new features.',
    tags: ['Part-time', 'Full-Stack'],
    contractor: null, // Job is not filled
  },
  {
    jobId: '67890',
    title: 'Product Manager',
    company: 'InnovateX',
    isRemote: false,
    startDate: '2023-12-01 10:00 AM',
    endDate: '2024-06-01 04:00 PM',
    pricePerHour: 60,
    description: 'The Product Manager will lead product strategy and execution. You will work closely with engineering, marketing, and sales to deliver innovative solutions.',
    tags: ['Management', 'Full-Time'],
    contractor: { name: 'John Doe', email: 'johndoe@example.com' }, // Job is filled
  },
];

const CompHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Sort and filter jobs based on the search query
  useEffect(() => {
    const searchLower = searchQuery.toLowerCase();

    // Filter jobs by title or company, and sort them by start date
    const filtered = jobs
      .filter((job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); // Sort by start date

    setFilteredJobs(filtered);
  }, [searchQuery]);

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
        {filteredJobs.map((job) => (
          <Paper key={job.jobId} sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Stack spacing={1} alignItems="flex-start">
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Job ID: {job.jobId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {job.isRemote ? 'Remote: Yes' : 'Remote: No'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Start Date: {job.startDate}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    End Date: {job.endDate}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Pay: ${job.pricePerHour}/hr
                  </Typography>
                  <Typography variant="body2">{job.description}</Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    {job.tags.map((tag, index) => (
                      <Chip key={index} label={tag} variant="outlined" />
                    ))}
                  </Stack>

                  {/* Display contractor information if job is filled */}
                  {job.contractor ? (
                    <Stack spacing={1} mt={2} sx={{ backgroundColor: '#f9f9f9', padding: 1, borderRadius: 1 }}>
                      <Typography variant="subtitle2" color="textPrimary">
                        Status: Filled
                      </Typography>
                      <Typography variant="body2">
                        Contractor: {job.contractor.name}
                      </Typography>
                      <Typography variant="body2">
                        Email: {job.contractor.email}
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

export default CompHome;

