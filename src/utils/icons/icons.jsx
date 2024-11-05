import logo from '../../assets/icons/logo.png';
import { Link } from 'react-router-dom';


function LogoHeader() {
  return (
    <Link to={'/'} >
      <img src={logo} alt="logo D10" className="logo" />
    </Link>
  )
}

export {
  LogoHeader
}