import { useState } from 'react';
import logo from '../assets/images/logo.png';
import { Grid, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { fetchWithAuth } from '../utils/api';

const LogIn = () => {
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for username
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed'); // Handle error appropriately
      }
  
      response.text().then(data => {
        localStorage.setItem('authToken', data)}); // Adjust based on your API response
  
      //const data = await response.json();
      //const token = data.token;
      //use "Authorization": "Bearer <token>" in headers


      // Store the token in localStorage
      fetchWithAuth(`${import.meta.env.VITE_API_URL}/users/type`,{
        method: "GET",
      }).then(res => {
        if(res.ok)res.json().then(data => {
          console.log(data.type)
          if(data.type == 'Contractor') navigate('/cont/jobs');
          else if(data.type == 'Company') navigate('/comp/jobs');
        })
      })
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
