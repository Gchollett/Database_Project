import React, { useState, useEffect } from 'react';
import { Stack, Typography, Button, Select, MenuItem, FormControl, InputLabel, Grid, Chip, TextField } from '@mui/material';

const ContSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortOption, setSortOption] = useState('pay-asc'); // Default sort by pay ascending
  const [remoteOption, setRemoteOption] = useState('all'); // Default to show both remote and non-remote jobs
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    // Setting initial job data
    setJobs([
      {
        jobId: '12345',
        title: 'Web Developer',
        company: 'Tech Hub',
        isRemote: true,
        startDate: '2023-11-01 09:00 AM',
        endDate: '2024-05-01 05:00 PM',
        pricePerHour: 50,
        description: 'As a Web Developer, you will develop high-quality software solutions. You will collaborate with cross-functional teams to define and implement new features.',
        tags: ['Part-time', 'Front-End'],  
      },
      {
        jobId: '67890',
        title: 'Product Manager',
        company: 'GNCM',
        isRemote: false,
        startDate: '2023-12-01 10:00 AM',
        endDate: '2024-06-01 04:00 PM',
        pricePerHour: 60,
        description: 'The Product Manager will lead product strategy and execution. You will work closely with engineering, marketing, and sales to deliver innovative solutions.',
        tags: ['Full-time', 'Management'],  
      },
    ]);
  }, []);

  useEffect(() => {
    let filtered = [...jobs];

    // Filter based on remoteOption
    if (remoteOption === 'remote') {
      filtered = filtered.filter((job) => job.isRemote);
    } else if (remoteOption === 'non-remote') {
      filtered = filtered.filter((job) => !job.isRemote);
    }

    // Search by title, company, or tags
    const searchLower = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );

    // Sort by selected pay option
    if (sortOption === 'pay-asc') {
      filtered.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (sortOption === 'pay-desc') {
      filtered.sort((a, b) => b.pricePerHour - a.pricePerHour);
    }

    setFilteredJobs(filtered);
  }, [jobs, sortOption, remoteOption, searchQuery]);

  return (
    <>
      <h2>Job Search</h2>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search by Title, Company, or Tags"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Sort by Pay</InputLabel>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <MenuItem value="pay-asc">Pay (Low to High)</MenuItem>
                <MenuItem value="pay-desc">Pay (High to Low)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Filter by Remote</InputLabel>
              <Select
                value={remoteOption}
                onChange={(e) => setRemoteOption(e.target.value)}
              >
                <MenuItem value="all">All Jobs</MenuItem>
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="non-remote">Non-Remote</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <hr />
        {filteredJobs.map((job) => (
          <React.Fragment key={job.jobId}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
              width="100%"
            >
              <Stack spacing={0.5} alignItems="flex-start">
                <Typography variant="body1">{job.title}</Typography>
                <Typography variant="body2">{job.company}</Typography>
                <Typography variant="body2" color="textSecondary">Job ID: {job.jobId}</Typography>
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
                  Price per Hour: ${job.pricePerHour}
                </Typography>
                <Typography variant="body2">{job.description}</Typography>
                <Stack direction="row" spacing={1} mt={1}>
                  {job.tags.map((tag, index) => (
                    <Chip key={index} label={tag} variant="outlined" />
                  ))}
                </Stack>
              </Stack>

              {/* Apply button */}
              <Button variant="contained" color="primary">
                Apply
              </Button>
            </Stack>
            <hr></hr>
          </React.Fragment>
        ))}
      </Stack>
      <br/><br/><br/><br/>
    </>
  );
};

export default ContSearch;

