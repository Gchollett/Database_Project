import React, { useEffect, useState } from 'react'
 
const ContProfile = () => {

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [username, setUsername] = useState('');
    const [rate,setRate] = useState(0);
    const [resume, setResume] = useState('');

    useEffect(() => {
        setFirst('Mary')
        setLast('Phillips')
        setUsername('mphillip')
        setRate(30)
        setResume('...')
    })

  return (
    <>
        <h3>My Profile</h3>
        <h4>First Name</h4>
        <p>{first}</p>
        <h4>Last Name</h4>
        <p>{last}</p>
        <h4>Username</h4>
        <p>{username}</p>
        <h4>Rate ($/hr)</h4>
        <p>{rate}</p>
        <h4>Resume</h4>
        <p>{resume}</p>
        <br></br><br></br>
    </>
  );
}
 
export default ContProfile