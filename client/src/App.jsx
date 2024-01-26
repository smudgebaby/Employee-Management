import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import Error from './pages/Error/Error.jsx'
import OnboardApplication from './pages/OnboardApplication/OnboardApplication.jsx'
import PersonalInfo from './pages/PersonalInfo/PersonalInfo.jsx'

function App() {

  return (
    <Router>
      
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/OnboardApplication' element={<OnboardApplication />} />
        <Route path='/PersonalInfo' element={<PersonalInfo />} />
        <Route path='*' element={<Error />} />
      </Routes>
    
    </Router>
  )
}

export default App
