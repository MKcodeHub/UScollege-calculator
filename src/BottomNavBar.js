import './BottomNavBar.css';

const BottomNavBar = ()  => {

    return (
        <nav className='bottomNav'>
            <div className='container'>
                <div className='row'>
                    <div className='col-left-1'>
                        <img onClick={() => window.location.href='/App.js'} className='webLogo' src='/logo2.png'></img>
                        <p style={{marginTop:"0px"}}>Displaying Better Wisdom</p>
                        <p><small>© 2023</small></p>
                    </div>
                    <div className='col-right'>
                        <h4>Inter.Student</h4>
                        <ul>
                            <li><a>Home Page</a></li>
                            <li><a>Feedback</a></li>
                            <li><a>Tuition Resources</a></li>
                            <li><a>Living Cost Resources</a></li>
                            <li><a>Contact Us</a></li>
                            <li><a>About us</a></li>
                        </ul>
                    </div>
                    <div className='col-right'>
                    <h4>Contribute</h4>
                        <ul>
                            <li><a>Add</a></li>
                            <li><a>Design</a></li>
                            <li><a>Data Resources</a></li>
                        </ul>
                    </div>
                    <div className='col-right'>
                    <h4>Community</h4>
                        <ul>
                            <li><a>Ranking</a></li>
                            <li><a>Students</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
        
    )
}


export default BottomNavBar;