import './App.css'
import Dashboard from './Components/Dashboard.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import VisaStatusPage from './Pages/VisaStatus/VisaStatusPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import Login from './Pages/Login/Login.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import Error from './Pages/Error/Error.jsx'
import OnboardApplication from './Pages/OnboardApplication/OnboardApplication.jsx'
import PersonalInfo from './Pages/PersonalInfo/PersonalInfo.jsx'
import DocumentPage from './Pages/DocumentPage';
import {PrivateRoute} from './Components/PrivateRoute';

function App() {

  return (
      <Router>
        <Dashboard>
          <Routes>
            <Route path="/visa-status" element={<PrivateRoute requiredRole='Employee'><VisaStatusPage /></PrivateRoute>} />
            <Route path="/forbidden" element={<Error>You are not allowed to access this page!</Error>} />
            <Route path="/" element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/OnboardApplication' element={<OnboardApplication />} />
            <Route path='/PersonalInfo' element={<PersonalInfo />} />
            <Route path='/personal-document' element={<DocumentPage />} />
            <Route path='*' element={<Error>Oops, something went wrong!</Error>} />
          </Routes>
        </Dashboard>
      </Router>
  )
}

export default App
