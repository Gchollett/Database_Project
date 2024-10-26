import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Layout from './components/contractor/ContLayout';
import LogIn from './containers/LogIn';
import ContHome from './containers/contractor/ContHome';
import ContProfile from './containers/contractor/ContProfile';
import ContApplications from './containers/contractor/ContApplications';
import ContSearch from './containers/contractor/ContSearch';
import CompSearch from './containers/company/CompSearch';
import CompHome from './containers/company/CompHome';
import CompApplications from './containers/company/CompApplications';
import CompProfile from './containers/company/CompProfile';
import CompLayout from './components/company/CompLayout';
import ContLayout from './components/contractor/ContLayout';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<LogIn/>}/>
        <Route path="/cont/" element={<ContLayout/>}>
          <Route path="jobs" element={<ContHome/>}/>
          <Route path="search" element={<ContSearch/>}/>
          <Route path="applications" element={<ContApplications/>}/>
          <Route path="profile" element={<ContProfile/>}/>
        </Route>
        <Route path="/comp/" element={<CompLayout/>}>
          <Route path="jobs" element={<CompHome/>}/>
          <Route path="create" element={<CompSearch/>}/>
          <Route path="applications" element={<CompApplications/>}/>
          <Route path="profile" element={<CompProfile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
</>
  )
}

export default App
