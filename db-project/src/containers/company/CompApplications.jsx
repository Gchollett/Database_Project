import React, { useEffect, useState } from 'react';
import { Stack, Typography, Button, Paper, Chip } from '@mui/material';

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
      {
        title: 'Web Developer',
        status: 'Rejected',
        jobId: '78652',
        company: 'DWC Consulting Group', // Same company as the first job
        applicationDate: '2023-10-20',
        employee: {
          userID: 'U789012',
          firstName: 'Alice',
          lastName: 'Smith',
          username: 'asmith',
          email: 'asmith@domain.com',
          rate: 35,
          resume: 'Web Developer skilled in HTML, CSS, and JavaScript with a knack for creating responsive web applications.',
          tags: ['HTML', 'CSS', 'JavaScript'], // Added tags
        },
      },
    ]);
  }, []);

  const handleAccept = (index) => {
    setJobs((prevJobs) =>
      prevJobs.map((job, i) => (i === index ? { ...job, status: 'Accepted' } : job))
    );
  };

  const handleReject = (index) => {
    setJobs((prevJobs) =>
      prevJobs.map((job, i) => (i === index ? { ...job, status: 'Rejected' } : job))
    );
  };

  return (
    <>
      <h2>Applications</h2>
      <Stack spacing={4}>
        {jobs.map((job, index) => (
          <Paper key={index} sx={{ padding: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack spacing={0.5} alignItems="flex-start">
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    ID: {job.jobId}
                  </Typography>
                </Stack>
                <Stack spacing={0.5} alignItems="flex-end">
                  <Typography variant="body2" color="textSecondary">
                    Status: {job.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Application Date: {job.applicationDate}
                  </Typography>
                </Stack>
              </Stack>

              {job.status === 'Pending' && (
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="primary" onClick={() => handleAccept(index)}>
                    Accept
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleReject(index)}>
                    Reject
                  </Button>
                </Stack>
              )}

              {/* Display contractor information */}
              {job.status === 'Pending' && (
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
                  <Typography variant="body2"><strong>Applicant Tags:</strong></Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    {job.employee.tags.map((tag, index) => (
                      <Chip key={index} label={tag} variant="outlined"/>
                    ))}
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Paper>
        ))}
      </Stack>
      <br></br><br></br><br></br><br></br>
    </>
  );
};

export default CompApplications;
