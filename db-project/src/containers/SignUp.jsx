import { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import logo from '../assets/images/logo.png'; // Adjust the path as necessary
import { fetchWithAuth } from '../utils/api';

const SignUp = () => {
  const [position, setposition] = useState('Contractor');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    name: '', // For company name
    rate: 0,     // For contractor rate
    resume: '',   // For contractor resume
    contractortag: [],     // For selected tags
    position: 'Contractor', // Add position to formData
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [availableTags,setAvailableTags] = useState([]);

  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlepositionChange = (e) => {
    const selectedposition = e.target.value;
    setposition(selectedposition);
    setFormData((prevData) => ({ ...prevData, position: selectedposition, contractortag: [] })); // Reset tags for company
  };

  const handleTagChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, contractortag: value }));
  };

  const handleRateChange = (e) => {
    const {value} = e.target;
    setFormData((prevData) => ({...prevData,rate:parseInt(value)}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      if (response.status === 201) { // Check for successful sign-up
        setSnackbarMessage('Successful sign up');
        setSnackbarSeverity('success');
        response.text().then(data => localStorage.setItem('authToken', data));
        fetchWithAuth(`${import.meta.env.VITE_API_URL}/users/type`,{
          method: "GET",
        }).then(res => res.json()).then(data => {
          if(data.type === 'Contractor') navigate('/cont/jobs');
          else if(data.type === 'Company') navigate('/comp/jobs');
        })
      } else if (response.status === 400) { // Check for unsuccessful sign-up
        console.log(await response.text());
        setSnackbarMessage('User already exists');
        setSnackbarSeverity('error');
      } else {
        // Handle other unexpected status codes
        setSnackbarMessage('An unexpected error occurred. Please try again later.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('An error occurred. Please try again later.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tags`).then((res) => res.json()).then(data => setAvailableTags(data))
  },[])

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh', padding: '20px' }} // Full height and padding
      >
        <Grid item xs={7}>
          <div style={{ textAlign: 'center' }}>
            <a href="/">
              <img src={logo} className="image" alt="Logo" style={{ width: '100%' }} />
            </a>
          </div>
        </Grid>
        <Grid item xs={10}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>User Type</InputLabel>
              <Select value={position} onChange={handlepositionChange}>
                <MenuItem value="Contractor">Contractor</MenuItem>
                <MenuItem value="Company">Company</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="username"
              name="username"
              margin="dense"
              label="Username"
              required
              fullWidth
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              id="password"
              name="password"
              margin="dense"
              label="Password"
              required
              fullWidth
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              id="firstname"
              name="firstname"
              margin="dense"
              label="First Name"
              required
              fullWidth
              value={formData.firstname}
              onChange={handleChange}
            />
            <TextField
              id="lastname"
              name="lastname"
              margin="dense"
              label="Last Name"
              required
              fullWidth
              value={formData.lastname}
              onChange={handleChange}
            />
            <TextField
              id="email"
              name="email"
              margin="dense"
              label="Email"
              required
              fullWidth
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            {position === 'Company' && (
              <TextField
                id="name"
                name="name"
                margin="dense"
                label="Company Name"
                required
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
            )}

            {position === 'Contractor' && (
              <>
                <TextField
                  id="rate"
                  name="rate"
                  margin="dense"
                  label="Rate"
                  required
                  fullWidth
                  type="number"
                  value={formData.rate}
                  onChange={handleRateChange}
                />
                <TextField
                  id="resume"
                  name="resume"
                  margin="dense"
                  label="Resume"
                  required
                  fullWidth
                  value={formData.resume}
                  onChange={handleChange}
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel>Tags</InputLabel>
                  <Select
                    multiple
                    value={formData.contractortag}
                    onChange={handleTagChange}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {availableTags.map((tag) => (
                      <MenuItem key={tag.name} value={tag.name}>
                        <input type="checkbox" checked={formData.contractortag.indexOf(tag.name) > -1} readOnly />
                        {tag.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button type="submit" variant="outlined" size="large">
                Sign Up
              </Button>
              <Button variant="outlined" size="large" onClick={() => navigate('/')}>
                Back to Login
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignUp;

