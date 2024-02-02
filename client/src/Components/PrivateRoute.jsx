import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoadSpinner from './LoadSpinner/LoadSpinner.jsx';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children, requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to check authentication status
    if (requiredRole !== '') {
      const checkAuthentication = async () => {
        try {
          const response = await axios.get('http://localhost:3000/user/auth-status', {
            withCredentials: true
          });
          setIsAuthenticated(response.data.isAuthenticated);
          setUser(response.data.user);
        } catch (error) {
          console.error('Authentication check failed', error);
          setIsAuthenticated(false);
        }
      };

      checkAuthentication();
    }
  }, []);

  if (isAuthenticated === null) {
    // Waiting for authentication check
    return <LoadSpinner />;
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (!('' === requiredRole || user.role === requiredRole)) {
    navigate('/forbidden');
    return null;
  }

  return children;
};
