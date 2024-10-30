import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import '../../assets/styles/Header.css';
import logo from '../../assets/images/logo.png';
import { Button, Grid, Menu, Tabs, ThemeProvider } from "@mui/material";
import { theme } from '../Theme';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const CompHeader = ({ location }) => {
    const [locationValue, setLocationValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        switch(location) {
            case '/comp/jobs':
                setLocationValue(0);
                break;
            case '/comp/create':
                setLocationValue(1);
                break;
            case '/comp/applications':
                setLocationValue(2);
                break;
            case '/comp/profile':
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

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/'); // Redirect to login or home
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
                <a href="/comp/jobs">
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
                                <Tab value={0} label="My Jobs" href="/comp/jobs" />
                                <Tab value={1} label="Create" href="/comp/create" />
                                <Tab value={2} label="Applications" href="/comp/applications" />
                                <Tab value={3} label="Profile" href="/comp/profile" />
                                <Tab value={4} label="Log Out" onClick={handleLogout} />
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
                            <Tab value={0} label="My Jobs" href="/comp/jobs" />
                            <Tab value={1} label="Create" href="/comp/create" />
                            <Tab value={2} label="Applications" href="/comp/applications" />
                            <Tab value={3} label="Profile" href="/comp/profile" />
                            <Tab value={4} label="Log Out" onClick={handleLogout} />
                        </Tabs>
                    </ThemeProvider>
                </div>
            </Grid>
        </Grid>
    );
};

export default CompHeader;