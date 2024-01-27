import './App.css'
import Dashboard from './Components/Dashboard.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import VisaStatusPage from './Pages/VisaStatusPage.jsx';
import HomePage from './Pages/HomePage.jsx';

function App() {

  return (
      <Router>
        <Dashboard>
          <Routes>
            <Route path="/visa-status" element={<VisaStatusPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Dashboard>
      </Router>
  )
}

export default App
