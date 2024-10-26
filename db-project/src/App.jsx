import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Layout from './components/Layout';
import LogIn from './containers/LogIn';
import Home from './containers/Home';
import ContProfile from './containers/ContProfile';
import JobFinder from './containers/JobFinder';
import ContApplications from './containers/ContApplications';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<LogIn/>}/>
        <Route path="/" element={<Layout/>}>
          <Route path="home" element={<Home/>}/>
          <Route path="jobfinder" element={<JobFinder/>}/>
          <Route path="capplications" element={<ContApplications/>}/>
          <Route path="cprofile" element={<ContProfile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
</>
  )
}

export default App
