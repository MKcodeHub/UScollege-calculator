import './Navbar.css';
import websiteLogo from '../src/logo1.png'


export default function Navbar () {


    const hmmmm = () => {
      console.log('screenshot!')
    }
    return (
    <nav className='nav'>
      
      <img onClick={() => window.location.href='/App.js'} className='webLogo' src={websiteLogo}></img>
      <a href="./App.js" className='site-title'>Wisdom.ST</a>
        <ul>
          {/* Slide Menu
              1. how to use the website and 
              2. infromation accurate feedback and
              3. about the university ranking and
              4. campus tour
              etc */}
          {/* <li>
            <a className="nav-a">FEEDBACK</a>
          </li> */}
          {/* <li>
            <a className="nav-a" onClick={hmmmm}>SAVE</a>
          </li>
          <li>
            <a className="nav-a">SHARE</a>
          </li> */}
        </ul>
    </nav>
    )
  }
