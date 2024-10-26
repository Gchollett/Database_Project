import React, { useState, useEffect } from 'react';
import { Stack, Typography, Button, Select, MenuItem, FormControl, InputLabel, Grid, TextField } from '@mui/material';

const ContractorSearch = () => {
  const [contractors, setContractors] = useState([]);
  const [filteredContractors, setFilteredContractors] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    // Setting initial contractor data
    setContractors([
      {
        id: 'C001',
        firstName: 'Mary',
        lastName: 'Phillips',
        resume: 'Experienced web developer with a strong background in front-end technologies.',
        rate: 30,
      },
      {
        id: 'C002',
        firstName: 'John',
        lastName: 'Doe',
        resume: 'Product manager with expertise in agile methodologies and team leadership.',
        rate: 60,
      },
    ]);
  }, []);

  useEffect(() => {
    const searchLower = searchQuery.toLowerCase();
    const filtered = contractors.filter(
      (contractor) =>
        contractor.firstName.toLowerCase().includes(searchLower) ||
        contractor.lastName.toLowerCase().includes(searchLower) ||
        contractor.resume.toLowerCase().includes(searchLower) ||
        contractor.id.toLowerCase().includes(searchLower) // Include ID in search
    );
    
    setFilteredContractors(filtered);
  }, [contractors, searchQuery]);

  return (
    <>
      <h2>Contractor Search</h2>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search by ID, First Name, Last Name, or Resume"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
        </Grid>
        <hr />
        {filteredContractors.map((contractor) => (
          <Stack
            key={contractor.id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            width="100%"
          >
            <Stack spacing={0.5} alignItems="flex-start">
              <Typography variant="body1">
                {contractor.firstName} {contractor.lastName}
              </Typography>
              <Typography variant="body2" color="textSecondary">ID: {contractor.id}</Typography>
              <Typography variant="body2" color="textSecondary">
                Rate: ${contractor.rate}/hr
              </Typography>
              <Typography variant="body2">{contractor.resume}</Typography>
            </Stack>

            {/* Contact button or any action button can go here */}
            <Button variant="contained" color="primary">
              Contact
            </Button>
          </Stack>
        ))}
      </Stack>
      <br /><br /><br /><br /><br />
    </>
  );
};

export default ContractorSearch;

