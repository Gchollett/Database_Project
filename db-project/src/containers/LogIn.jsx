import React from 'react'
import logo from '../assets/images/logo.png'
import { Grid, TextField, Button} from "@mui/material";
 
const LogIn = () => {

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
                    <img src={logo} className="image"></img>
                </a>
            </Grid>
            <Grid item xs={10}>
            <TextField
              id="user"
              name="user"
              margin="dense"
              placeholder=""
              required
              label="Username"
              fullWidth
            />
            <TextField
              id="pass"
              name="pass"
              margin="dense"
              placeholder=""
              required
              label="Password"
              fullWidth
            />
             <Button type="submit" variant="outlined" size="large" href='/cont/home'>Log In</Button>
            </Grid>
            </Grid>
     
    </>
  );
}
 
export default LogIn


