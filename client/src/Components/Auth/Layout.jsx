import { useState } from 'react';
import PropTypes from 'prop-types';
import {signInUser, signUpUser} from '../../Utils/backendUtil.js';
import {useNavigate} from 'react-router-dom';
import './Layout.css';

const Layout = ({ status, title, description, buttonText, isValidEmail, isValidPassword }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    switch (status) {
      case 'signup':
        await handleSignUp();
        break
      case 'signin':
        await handleSignIn();
    }
  };

  const handleSignUp = async () => {
    const ok = await signUpUser(username, email, password);
    if(ok) {
      navigate('/login');
    } else {
      alert('Error signing up');
    }
  }

  const handleSignIn = async () => {
    const user = await signInUser(email, password);
    if(user) {
      navigate('/')
    } else {
      alert('Error signing in');
    }
  }


  return (
    <>
      <div className='layout-container'>
        <div className='layout-form-container'>
          <h1>{title}</h1>
          {description && <p className="description">{description}</p>}
          <form onSubmit={handleSubmit}>
            {
              status === 'signup' && <div className={'email-container'}>
                <label>User Name</label>
                <input
                  type="username"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                ></input>
              </div>
            }
            <div className={isValidEmail(email) ? 'email-container' : 'invalid-container'}>
              <label>Email</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <p className='invalid-warning'>{!isValidEmail(email) && 'Invalid Email Input!'}</p>
            </div>

            { status !=='reset-password' && <div className={isValidPassword(password) ? 'password-container' : 'invalid-container'}>
                <label>Password</label>
                <div className='password-input-container'>
                  <input
                    type={passwordShow ? 'text' : 'password'}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  
                  <button
                    type='button'
                    onClick={handleTogglePasswordShow}
                    className='password-show-button'
                  >{passwordShow ? 'Hide' : 'Show'}</button>
                </div>
                <p className='invalid-warning'>{!isValidPassword(password) && 'Invalid Password Input!'}</p>
                <p className='invalid-warning'>{!isValidPassword(password) && 
                  'Password must contain at least 1 lower case letter, 1 upper case letter, and 1 numeric character!'}
                </p>
              </div>
            }

            <button type="submit" className={`${status}-button`} disabled={(!isValidPassword(password)) || (!isValidEmail(email))}>
              {buttonText}
            </button>
          </form>

        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  status:  PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  additionalLinks: PropTypes.node,
  isValidEmail: PropTypes.func,
  isValidPassword: PropTypes.func,
};

export default Layout;