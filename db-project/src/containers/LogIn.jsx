import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { Grid, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const LogIn = () => {
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for username
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log('Request Headers:', username, password);
      console.log(response)
      if (!response.ok) {
        throw new Error('Login failed'); // Handle error appropriately
      }
  
      const token = response; // Adjust based on your API response
  
      //const data = await response.json();
      //const token = data.token;
      //use "Authorization": "Bearer <token>" in headers


      // Store the token in localStorage
      localStorage.setItem('authToken', token);
  
      // Navigate based on username
      if (username.startsWith('1')) {
        navigate('/cont/jobs');
      } else if (username.startsWith('2')) {
        navigate('/comp/jobs');
      } else {
        alert('Invalid username. Please enter a username starting with "1" or "2".');
      }
    } catch (error) {
      alert(error.message); // Display error message
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <Grid container spacing={2} style={{ marginTop: '0px' }}>
              <Grid item xs={12}>
                <Button type="submit" variant="outlined" size="large" >
                  Log In
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="outlined" 
                  size="large" 
                  onClick={() => navigate('/signup')} // Navigate to sign-up page
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default LogIn;
