import React, { useEffect, useState } from 'react';
import { Stack, Typography, Button, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchWithAuth } from '../../utils/api';

const CompApplications = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchWithAuth(`${import.meta.env.VITE_API_URL}/applications`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setJobs(data); // Assuming data is the array of jobs
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);
  //TODO
  const handleAccept = (jobId,contractorId) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token

    // Create the URL for the PUT request
    const url = `${import.meta.env.VITE_API_URL}/applications/${jobId}/${contractorId}`;

    // Set up the request options
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify("Accepted"), // Sending status as the request body
    };

    // Make the PUT request
    fetch(url, options)
        .then((res) => {
            if (res.ok) {
                return res.json(); // Successful response
            } else if (res.status === 400) {
                throw new Error('Application does not exist.');
            } else if (res.status === 410) {
                throw new Error('Not authorized.');
            } else {
                throw new Error('An unexpected error occurred.');
            }
        })
        .then(data => {
            console.log('Successfully accepted.');
        })
        .catch(error => {
            console.error('Error accepting.');
        });
  };

  //TODO
  const handleReject = (jobId,contractorId) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token

    // Create the URL for the PUT request
    const url = `${import.meta.env.VITE_API_URL}/applications/${jobId}/${contractorId}`;

    // Set up the request options
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify("Rejected"), // Sending status as the request body
    };

    // Make the PUT request
    fetch(url, options)
        .then((res) => {
            if (res.ok) {
                return res.json(); // Successful response
            } else if (res.status === 400) {
                throw new Error('Application does not exist.');
            } else if (res.status === 410) {
                throw new Error('Not authorized.');
            } else {
                throw new Error('An unexpected error occurred.');
            }
        })
        .then(data => {
            console.log('Successfully rejected');
        })
        .catch(error => {
            console.error('Error rejecting.');
        });
  
  };

  return (
    <>
      <h2>Job Applications</h2>
      <Stack spacing={4}>
        {jobs.map((job, index) => {
          const applicationCount = job.jobapplication.length;

          return (
            <Accordion key={job.title}>
             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                  <Stack spacing={1} alignItems="flex-start">
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Job ID: {job.jobid}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="textSecondary">
                    {applicationCount} Application{applicationCount !== 1 ? 's' : ''}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={4}>
                  {job.jobapplication.map((application, appIndex) => (
                    <Paper key={appIndex} sx={{ padding: 2 }}>
                      <Stack spacing={2}>
                        <Typography variant="h6">Applicant Information:</Typography>
                        <Typography variant="body2">
                          <strong>Name:</strong> {application.contractor.firstname} {application.contractor.lastname}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Rate:</strong> ${application.contractor.rate}/hr
                        </Typography>
                        <Typography variant="body2">
                          <strong>Resume:</strong> {application.contractor.resume}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAccept(job.jobid, application.contractor.contid)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleReject(job.jobid, application.contractor.contid)}
                          >
                            Reject
                          </Button>
                        </Stack>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Stack>
      <br></br><br></br><br></br><br></br>
    </>
  );
};

export default CompApplications;
