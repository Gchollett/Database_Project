import { useEffect, useState } from 'react';
import { Stack, Typography, Button, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchWithAuth } from '../../utils/api';

const CompApplications = () => {
  const [jobs, setJobs] = useState([]);

  const fixJobs = () => {
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
  }

  useEffect(() => {
    fixJobs();
  }, []);
  //TODO
  const handleAccept = (jobId,contractorId) => {

    // Create the URL for the PUT request
    const url = `${import.meta.env.VITE_API_URL}/applications/${jobId}/${contractorId}`;

    // Make the PUT request
    fetchWithAuth(url, {
      method: 'PUT',
      body: JSON.stringify({status:"Accepted"}), // Sending status as the request body
    }).then((res) => {
            if (res.ok) {
              fixJobs()
            } else if (res.status === 400) {
                throw new Error('Application does not exist.');
            } else if (res.status === 410) {
                throw new Error('Not authorized.');
            } else {
                throw new Error('An unexpected error occurred.');
            }
    })
  };

  //TODO
  const handleReject = (jobId,contractorId) => {

    // Create the URL for the PUT request
    const url = `${import.meta.env.VITE_API_URL}/applications/${jobId}/${contractorId}`;


    // Make the PUT request
    fetchWithAuth(url, {
      method: 'PUT',
      body: JSON.stringify({status:"Rejected"}), // Sending status as the request body
    }).then((res) => {
            if (res.ok) {
              fixJobs();
            } else if (res.status === 400) {
                throw new Error('Application does not exist.');
            } else if (res.status === 410) {
                throw new Error('Not authorized.');
            } else {
                throw new Error('An unexpected error occurred.');
            }
        })
  };

  return (
    <>
      <h2>Job Applications</h2>
      <Stack spacing={4}>
        {jobs.map((job,index) => {
          const applicationCount = job.jobapplication.length;

          return (
            <Accordion key={index}>
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
                          <Typography variant="body1">
                            <strong>Status:</strong> {application.status}
                          </Typography>
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
