import './HomePage.css';
import {Button} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/user/logout', {}, { withCredentials: true });
      console.log('Logged out successfully');
      navigate('/login');
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <div className='home-container'>
        <h1>Welcome!</h1>
        <Button variant="contained" size="large" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
}

export default HomePage;