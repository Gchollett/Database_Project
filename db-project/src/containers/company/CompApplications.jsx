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

  const handleApply = (index, jobTitle) => {
    // Logic to handle application acceptance
    console.log(`Applying for job: ${jobTitle} at index: ${index}`);
  };

  const handleReject = (index, jobTitle) => {
    // Logic to handle application rejection
    console.log(`Rejecting application for job: ${jobTitle} at index: ${index}`);
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
                  <Typography variant="h6">{job.title}</Typography>
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
                            onClick={() => handleApply(appIndex, job.title)}
                          >
                            Apply
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleReject(appIndex, job.title)}
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
    </>
  );
};

export default CompApplications;
