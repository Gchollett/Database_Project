import React, { useState } from 'react';
import {
  Stack,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';

const CompCreate = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [hourlyPay, setHourlyPay] = useState('');
  const [isRemote, setIsRemote] = useState('No');
  const [startDate, setStartDate] = useState(''); // Start with empty
  const [endDate, setEndDate] = useState(''); // Start with empty
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  const handleCreateJob = () => {
    // Validate inputs (optional)
    if (!jobTitle || !hourlyPay || !startDate || !endDate || !description || tags.length === 0) {
      alert('Please fill in all fields.');
      return;
    }

    // Create job object (optional: do something with it)
    const newJob = {
      jobTitle,
      hourlyPay,
      isRemote,
      startDate,
      endDate,
      description,
      tags,
    };

    console.log('New Job Created:', newJob);
    
    // Open the snackbar
    setOpenSnackbar(true); 

    // Clear all fields
    setJobTitle('');
    setHourlyPay('');
    setIsRemote('No');
    setStartDate(''); // Clear to empty
    setEndDate(''); // Clear to empty
    setDescription('');
    setTags([]);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleTagsChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
      <h2>Create Job Posting</h2>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Title"
              variant="outlined"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Hourly Pay"
              variant="outlined"
              type="number"
              value={hourlyPay}
              onChange={(e) => setHourlyPay(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Remote</InputLabel>
              <Select
                value={isRemote}
                onChange={(e) => setIsRemote(e.target.value)}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Start Date/Time"
              variant="outlined"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="End Date/Time"
              variant="outlined"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Tags</InputLabel>
              <Select
                multiple
                value={tags}
                onChange={handleTagsChange}
                renderValue={(selected) => selected.join(', ')}
              >
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                {/* Add more tag options as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleCreateJob}>
              Create
            </Button>
          </Grid>
        </Grid>
      </Stack>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Job Added
        </Alert>
      </Snackbar>
      <br></br><br></br><br></br><br></br>
    </>
  );
};

export default CompCreate;


