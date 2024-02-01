import Layout from '../../Components/auth/Layout';
import { useLocation } from 'react-router-dom';

const EmployeeSignUp = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    return (password.length >= 8) && (/[a-z]/.test(password)) && (/[A-Z]/.test(password)) && (/\d/.test(password))
  }

  return (
    <Layout
      status='signup'
      title="Sign up to an account"
      buttonText="Create Account"
      isValidEmail={isValidEmail}
      isValidPassword={isValidPassword}
      role = 'Employee'
      token = {token}
    />
  );
};

export default EmployeeSignUp;
