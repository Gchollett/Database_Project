import React, { useState, useEffect } from 'react';
import { Stack, Typography, Button, Select, MenuItem, FormControl, InputLabel, Grid, TextField, Tooltip, Switch, FormControlLabel, Chip } from '@mui/material';
import { fetchWithAuth } from '../../utils/api';

const ContSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortOption, setSortOption] = useState('pay-asc'); // Default sort by pay ascending
  const [remoteOption, setRemoteOption] = useState('all'); // Default to show both remote and non-remote jobs
  const [topPickOption, setTopPickOption] = useState(false); // Default to show both Top Picks and non-top picks (false means off)
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    fetchWithAuth(`${import.meta.env.VITE_API_URL}/jobs`, {
      method: 'GET'
    })
    .then((res) => {
      if (!res.ok) {
        res.text();
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      setJobs(data); // Assuming data is an array of job objects
      setFilteredJobs(data); // Initialize filteredJobs with the fetched jobs
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

    fetchWithAuth(`${import.meta.env.VITE_API_URL}/jobs/recommended`, {
      method: 'GET'
    })
    .then((res) => {
      if (!res.ok) {
        res.text();
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      setRecommended(data); // Assuming data is an array of job objects
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []); // Run only once on component mount

  useEffect(() => {
    let filtered = [...jobs];

    // Filter based on remoteOption
    if (remoteOption === 'remote') {
      filtered = filtered.filter((job) => job.remote);
    } else if (remoteOption === 'non-remote') {
      filtered = filtered.filter((job) => !job.remote);
    }

    // Filter based on topPickOption (new toggle)
    if (topPickOption) {
      filtered = filtered.filter((job) => recommended.some((rec) => rec.jobid === job.jobid));
    }

    // Search by title or description
    const searchLower = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.company.name.toLowerCase().includes(searchLower) ||
        job.jobtag.some(tag => tag.name.toLowerCase().includes(searchLower))
    );

    // Sort by selected pay option
    if (sortOption === 'pay-asc') {
      filtered.sort((a, b) => a.pay - b.pay);
    } else if (sortOption === 'pay-desc') {
      filtered.sort((a, b) => b.pay - a.pay);
    }

    setFilteredJobs(filtered);
  }, [jobs, sortOption, remoteOption, searchQuery, topPickOption, recommended]);

  const applyForJob = async (jobid) => {
    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/applications/${jobid}/apply`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Application failed');
      }

      const data = await response.text();
      alert('Application submitted successfully!');
    } catch (error) {
      alert(error.message); // Display error message
    }
  };

  return (
    <>
      <h2>Job Search</h2>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search by Title, Company, Description, or Tags"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={topPickOption}
                  onChange={(e) => setTopPickOption(e.target.checked)}
                  color="primary"
                />
              }
              label="Show Only Top Picks"
            />
          </Grid>
        </Grid>
        <hr />
        {filteredJobs.map((job) => (
          <React.Fragment key={job.jobid}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
              width="100%"
            >
              <Stack spacing={0.5} alignItems="flex-start">
                <Typography variant="body1">{job.title}</Typography>
                <Typography variant="body2">{job.company.name}</Typography>
                <Typography variant="body2" color="textSecondary">Job ID: {job.jobid}</Typography>
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
              </Stack>
              <Stack spacing={1} alignItems="flex-end">
                {recommended.some((rec) => rec.jobid === job.jobid) && (
                  <Tooltip title="This job is recommended to you by our algorithm. It will maximize your profits based on your currently accepted jobs." arrow>
                    <Typography variant="subtitle2" color="primary">
                      Top Pick For You
                    </Typography>
                  </Tooltip>
                )}
                <Button variant="contained" color="primary" onClick={() => applyForJob(job.jobid)}>
                  Apply
                </Button>
              </Stack>
            </Stack>
            <hr />
          </React.Fragment>
        ))}
      </Stack>
      <br /><br /><br /><br />
    </>
  );
};

export default ContSearch;

