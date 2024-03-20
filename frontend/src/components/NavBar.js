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
            <div className="links">
                <div className="logo-link">
                    <Link to="/">
                        <PictureFrame
                            src={process.env.PUBLIC_URL + '/images/STMLogo.png'} 
                            alt={'STM Tuning, Volkswagen and Audi performance garage and repair shop.'} /> 
                    </Link>
                </div>
                {user && user.access > 1 && <Link to="/users">
                    Customers
                </Link>}
            </div>

            <div className="links">
                {user && (
                    <div className="logged-in">
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log Out</button>
                    </div>)}
                {!user && (
                    <div className="login">
                        <Link to='/login'>Login</Link>
                        <Link to='/selfsignup'>Signup</Link>
                    </div>)}
            </div>
        </header>
    )
}

export default NavBar