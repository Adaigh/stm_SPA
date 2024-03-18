import { Link } from "react-router-dom"
import './styles/NavBar.css'
import PictureFrame from '../components/PictureFrame.js';

const NavBar = () => {

    return (
        <header>
            <div className="navigation">
                <div className="logo-link">
                    <Link to="/">
                        <PictureFrame
                            src={process.env.PUBLIC_URL + '/images/STMLogo.png'} 
                            alt={'STM Tuning, Volkswagen and Audi performance garage and repair shop.'} /> 
                    </Link>
                </div>
                <Link to="/">Home</Link>
                <Link to="/">Schedule</Link>
            </div>
            <div className="navigation login">
                <Link to='/login'>Login</Link>
                <Link to='/selfsignup'>Signup</Link>
            </div>
        </header>
    )
}

export default NavBar