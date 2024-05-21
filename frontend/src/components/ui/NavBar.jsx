import { Link } from "react-router-dom"

import PictureFrame from './PictureFrame'

import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from "../../hooks/useAuthContext"

import './styles/NavBar.css'

const NavBar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()
    const logo = require('./styles/assets/STMlogo.png')

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="links">
                <div className="logo-link">
                    <Link to="/">
                        <PictureFrame
                            src={logo} 
                            alt={'STM Tuning, Volkswagen and Audi performance garage and repair shop.'} /> 
                    </Link>
                </div>
                <Link to="/">Home</Link>
                <Link to="/calendar">Calendar</Link>
                {user && user.access > 1 && 
                    <>
                        <Link to="/customers" className="staff-only">Customers</Link>
                        <Link to="/Schedule" className="staff-only">Schedule</Link>    
                    </>}
            </div>

            <div className="links">
                {user && (
                    <div className="logged-in">
                        {user.access > 0 && <span><u>STAFF</u>: <Link to='/details'>{user.user}</Link></span>}
                        {user.access === 0 && 
                            <Link to='/details'>{user.user}</Link>
                        }
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