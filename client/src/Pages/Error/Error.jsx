import './Error.css'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Error({children}) {
  let navigate = useNavigate();
	const handleClick = () => {
    navigate('/')
  }

  return (
    <>
      <div className="error-container">
        <ErrorOutlineIcon style={{ color: '#5b6af5', fontSize: 80 }} />
        <p className='description'>{children}</p>
        <button className='home-button' onClick={handleClick}>Go Home</button>
      </div>
    </>
  )
}

export default Error
