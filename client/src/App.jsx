import './App.css'
import Dashboard from './Components/Dashboard.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import VisaStatusPage from './Pages/VisaStatusPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import Login from './Pages/Login/Login.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import Error from './Pages/Error/Error.jsx'
import OnboardApplication from './Pages/OnboardApplication/OnboardApplication.jsx'
import PersonalInfo from './Pages/PersonalInfo/PersonalInfo.jsx'

function App() {

  return (
      <Router>
        <Dashboard>
          <Routes>
            <Route path="/visa-status" element={<VisaStatusPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/OnboardApplication' element={<OnboardApplication />} />
            <Route path='/PersonalInfo' element={<PersonalInfo />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </Dashboard>
      </Router>
  )
}

export default App
