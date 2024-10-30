import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import LogIn from './containers/LogIn';
import ContJobs from './containers/contractor/ContJobs';
import ContProfile from './containers/contractor/ContProfile';
import ContApplications from './containers/contractor/ContApplications';
import ContSearch from './containers/contractor/ContSearch';
import CompCreate from './containers/company/CompCreate';
import CompJobs from './containers/company/CompJobs';
import CompApplications from './containers/company/CompApplications';
import CompProfile from './containers/company/CompProfile';
import CompLayout from './components/company/CompLayout';
import ContLayout from './components/contractor/ContLayout';
import SignUp from './containers/SignUp';

function App() {

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');
    return token ? children : <Navigate to="/" />;
  };

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<LogIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/cont/" element={<PrivateRoute><ContLayout/></PrivateRoute>}>
          <Route path="jobs" element={<PrivateRoute><ContJobs/></PrivateRoute>}/>
          <Route path="search" element={<PrivateRoute><ContSearch/></PrivateRoute>}/>
          <Route path="applications" element={<PrivateRoute><ContApplications/></PrivateRoute>}/>
          <Route path="profile" element={<PrivateRoute><ContProfile/></PrivateRoute>}/>
        </Route>
        <Route path="/comp/" element={<PrivateRoute><CompLayout/></PrivateRoute>}>
          <Route path="jobs" element={<PrivateRoute><CompJobs/></PrivateRoute>}/>
          <Route path="create" element={<PrivateRoute><CompCreate/></PrivateRoute>}/>
          <Route path="applications" element={<PrivateRoute><CompApplications/></PrivateRoute>}/>
          <Route path="profile" element={<PrivateRoute><CompProfile/></PrivateRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>
</>
  )
}

export default App
