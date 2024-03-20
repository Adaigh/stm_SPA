import { Link } from "react-router-dom"
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import './styles/NavBar.css'
import PictureFrame from '../components/PictureFrame.js';

const NavBar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>STM Home</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log Out</button>
                        </div>)}
                    {!user && (
                        <div>
                            <Link to='/login'>Login</Link>
                            <Link to='/selfsignup'>Signup</Link>
                        </div>)}
                </nav>
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