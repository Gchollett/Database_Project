import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import '../assets/styles/Header.css';
import logo from '../assets/images/logo.png';
import { Button, Grid, Menu, Tabs, ThemeProvider } from "@mui/material";
import { theme } from './Theme';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ location }) => {
    const [locationValue, setLocationValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        switch(location) {
            case '/home':
                setLocationValue(0);
                break;
            case '/jobfinder':
                setLocationValue(1);
                break;
            case '/capplications':
                setLocationValue(2);
                break;
            case '/cprofile':
                setLocationValue(3);
                break;
            
            case '/':
                break;
            default:
                break;
        }
    }, [location]); // Add location as a dependency

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid
            columns={16}
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
        >     
            <Grid item xs={4}>
                <a href="/">
                    <img src={logo} className="image" alt="Logo" />
                </a>
            </Grid>
            <Grid item xs={12}>
                <div className="hamburger">
                    <ThemeProvider theme={theme}>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MenuIcon />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <Tabs 
                                value={locationValue}
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                orientation="vertical"
                            >
                                <Tab value={0} label="My Jobs" href="/home" />
                                <Tab value={1} label="Job Finder" href="/jobfinder" />
                                <Tab value={2} label="Applications" href="/capplications" />
                                <Tab value={3} label="My Profile" href="/cprofile" />
                                <Tab value={4} label="Log Out" href="/" />
                            </Tabs>
                        </Menu>
                    </ThemeProvider>
                </div>
                <div className="menubar">
                    <ThemeProvider theme={theme}>
                        <Tabs 
                            value={locationValue}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                        >
                            <Tab value={0} label="My Jobs" href="/home" />
                            <Tab value={1} label="Job Finder" href="/jobfinder" />
                            <Tab value={2} label="Applications" href="/capplications" />
                            <Tab value={3} label="My Profile" href="/cprofile" />
                            <Tab value={4} label="Log Out" href="/" />
                        </Tabs>
                    </ThemeProvider>
                </div>
            </Grid>
        </Grid>
    );
};

export default Header;