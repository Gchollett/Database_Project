import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Layout from './components/Layout';
import LogIn from './containers/LogIn';
import ContHome from './containers/contractor/ContHome';
import ContProfile from './containers/contractor/ContProfile';
import ContApplications from './containers/contractor/ContApplications';
import ContSearch from './containers/contractor/ContSearch';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<LogIn/>}/>
        <Route path="/cont/" element={<Layout/>}>
          <Route path="home" element={<ContHome/>}/>
          <Route path="search" element={<ContSearch/>}/>
          <Route path="applications" element={<ContApplications/>}/>
          <Route path="profile" element={<ContProfile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
</>
  )
}

export default App
