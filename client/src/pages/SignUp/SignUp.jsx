import Layout from '../../components/auth/Layout';

const SignUp = () => {

  
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
    />
  );
};

export default SignUp;
