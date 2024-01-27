import Layout from '../../Components/auth/Layout';

const Login = () => {

  const isValidEmail = () => {
    return true;
  };

  const isValidPassword = () => {
    return true;
  };

  return (
    <Layout
      status='signin'
      title="Log in to your account"
      buttonText="Sign In"
      isValidEmail={isValidEmail}
      isValidPassword={isValidPassword}
    />
  );
};

export default Login;