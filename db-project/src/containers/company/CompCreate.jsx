import { useEffect, useState } from 'react';
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
  const [hourlyPay, setHourlyPay] = useState(0.0);
  const [isRemote, setIsRemote] = useState(false);
  const [startDate, setStartDate] = useState(''); // Start with empty
  const [endDate, setEndDate] = useState(''); // Start with empty
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  const handleCreateJob = async () => {
    // Validate inputs (optional)
    if (!jobTitle || !hourlyPay || !startDate || !endDate || !description || tags.length === 0) {
        alert('Please fill in all fields.');
        return;
    }

    // Create job object
    const newJob = {
      title: jobTitle,
      pay: parseInt(hourlyPay),
      remote: isRemote,
      start: new Date(startDate),
      end: new Date(endDate),
      description: description,
      jobtag: tags,
    };

    // Prepare the token (assuming you have it stored in localStorage or a context)
    const token = localStorage.getItem('authToken'); // Replace with your method of retrieving the token
    try {
        // Make the POST request to the API
        const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Pass the token in the Authorization heade
          },
          body: JSON.stringify(newJob),
        });
      
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            response.text().then(data => console.log(data))
            throw new Error('Failed to create job');
        }

        // Open the snackbar
        setOpenSnackbar(true);

        // Clear all fields
        setJobTitle('');
        setHourlyPay(0.0);
        setIsRemote(false);
        setStartDate('');
        setEndDate('');
        setDescription('');
        setTags([]);
    } catch (error) {
        console.error('Error creating job:', error);
        alert('There was an error creating the job. Please try again.'); // Handle the error accordingly
    }
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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tags`).then(res => res.json()).then(data => setAvailableTags(data))
  },[])

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
              onChange={(e) => setHourlyPay(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Remote</InputLabel>
              <Select
                value={isRemote ? 'Yes' : 'No'} 
                onChange={(e) => setIsRemote(e.target.value === 'Yes')}
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
                {availableTags.map((tag,i) => <MenuItem key={i} value={tag.name}>
                        <input type="checkbox" checked={tags.indexOf(tag.name) > -1} readOnly />
                        {tag.name}
                      </MenuItem>)}
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


