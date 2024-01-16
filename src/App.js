import './index.css'
import NavBar from './NavBar';
import UniList from './UniList';
import BottomNavBar from './BottomNavBar';

function App() {
  
  return (
    <> {/* '<>' need this! */}
    <NavBar/>
    
    <div className='body'>
      <UniList/>
      {/* <Testing></Testing> */}
    </div>
     
    <BottomNavBar/>
    </>
  )
}

export default App;
