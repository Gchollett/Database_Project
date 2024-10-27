import React, { useEffect, useState } from 'react';
import { Stack, Typography, Button, Paper, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CompApplications = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs([
      {
        title: 'Software Engineer',
        status: 'Pending',
        jobId: '12345',
        applicationDate: '2023-10-15',
        employee: {
          userID: 'U123456',
          firstName: 'Mary',
          lastName: 'Phillips',
          username: 'mphillip',
          email: 'mphillip@trinity.edu',
          rate: 30,
          resume: 'Experienced software engineer with a passion for developing innovative programs. Skilled in JavaScript, React, and Node.js.',
          tags: ['JavaScript', 'React', 'Node.js'], // Added tags
        },
      },
      {
        title: 'Software Engineer',
        status: 'Pending',
        jobId: '12345',
        applicationDate: '2023-10-16',
        employee: {
          userID: 'U654322',
          firstName: 'Steve',
          lastName: 'Rogers',
          username: 'srogers',
          email: 'srogers@trinity.edu',
          rate: 35,
          resume: 'Software engineer with expertise in C++ and distributed systems.',
          tags: ['C++', 'Distributed Systems'], // Added tags
        },
      },
      {
        title: 'Product Manager',
        status: 'Pending',
        jobId: '54321',
        applicationDate: '2023-10-20',
        employee: {
          userID: 'U654321',
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          email: 'johndoe@example.com',
          rate: 40,
          resume: 'Product Manager with over 5 years of experience in leading cross-functional teams to deliver high-quality products.',
          tags: ['Agile', 'Leadership', 'Product Development'], // Added tags
        },
      },
    ]);
  }, []);

  // Group applications by jobId
  const groupedJobs = jobs.reduce((acc, job) => {
    if (!acc[job.jobId]) {
      acc[job.jobId] = {
        title: job.title,
        jobId: job.jobId,
        applications: [],
      };
    }
    acc[job.jobId].applications.push(job);
    return acc;
  }, {});

  const handleAccept = (index, jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job, i) =>
        job.jobId === jobId && i === index ? { ...job, status: 'Accepted' } : job
      )
    );
  };

  const handleReject = (index, jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job, i) =>
        job.jobId === jobId && i === index ? { ...job, status: 'Rejected' } : job
      )
    );
  };

  return (
    <>
      <h2>Applications</h2>
      <Stack spacing={4}>
        {Object.keys(groupedJobs).map((jobId) => {
          const jobGroup = groupedJobs[jobId];
          const applicationCount = jobGroup.applications.length; // Get the count of applications

          return (
            <Accordion key={jobId}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                  <Typography variant="h6">{jobGroup.title}</Typography>
                  <Typography variant="subtitle1" sx={{ marginLeft: 2 }}>
                    Job ID: {jobId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 'auto' }}>
                    {applicationCount} Application{applicationCount > 1 ? 's' : ''}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={4}>
                  {jobGroup.applications.map((job, index) => (
                    <Paper key={index} sx={{ padding: 2 }}>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack spacing={0.5} alignItems="flex-start">
                            <Typography variant="subtitle1" color="textSecondary">
                              Application Date: {job.applicationDate}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Status: {job.status}
                            </Typography>
                          </Stack>
                        </Stack>

                        {job.status === 'Pending' && (
                          <Stack direction="row" spacing={2}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleAccept(index, jobId)}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleReject(index, jobId)}
                            >
                              Reject
                            </Button>
                          </Stack>
                        )}

                        {/* Display contractor information */}
                        <Stack spacing={1} sx={{ marginTop: 2 }}>
                          <Typography variant="h6">Applicant Information:</Typography>
                          <Typography variant="body2">
                            <strong>Name:</strong> {job.employee.firstName} {job.employee.lastName}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Username:</strong> {job.employee.username}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Email:</strong> {job.employee.email}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Rate:</strong> ${job.employee.rate}/hr
                          </Typography>
                          <Typography variant="body2">
                            <strong>Resume:</strong> {job.employee.resume}
                          </Typography>

                          {/* Display tags */}
                          <Typography variant="body2">
                            <strong>Applicant Tags:</strong>
                          </Typography>
                          <Stack direction="row" spacing={1} mt={1}>
                            {job.employee.tags.map((tag, index) => (
                              <Chip key={index} label={tag} variant="outlined" />
                            ))}
                          </Stack>
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
