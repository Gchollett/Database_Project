import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { Grid, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const LogIn = () => {
  const [username, setUsername] = useState(''); // State for username
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Check the first character of the username and redirect accordingly
    if (username.startsWith('1')) {
      navigate('/cont/jobs'); // Redirect to '/cont/jobs' for usernames starting with '1'
    } else if (username.startsWith('2')) {
      navigate('/comp/jobs'); // Redirect to '/comp/jobs' for usernames starting with '2'
    } else {
      // Handle other cases, e.g., show an error message
      alert('Invalid username. Please enter a username starting with "1" or "2".');
    }
  };

  return (
    <>
      <Grid
        columns={16}
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={7}>
          <a href="/">
            <img src={logo} className="image" alt="Logo" />
          </a>
        </Grid>
        <Grid item xs={10}>
          <form onSubmit={handleLogin}>
            <TextField
              id="user"
              name="user"
              margin="dense"
              placeholder=""
              required
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update state on input change
            />
            <TextField
              id="pass"
              name="pass"
              margin="dense"
              placeholder=""
              required
              label="Password"
              fullWidth
              type="password" // Added type for better security
            />
            <Button type="submit" variant="outlined" size="large">
              Log In
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default LogIn;
