import { Link } from "react-router-dom"

import PictureFrame from './PictureFrame'

import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from "../../hooks/useAuthContext"

import './styles/NavBar.css'

const NavBar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()
    const logo = require('./styles/assets/STMlogo.png')

    const handleClick = () => {
        logout()
    }

    const handleMenuClick = () => {
        document.getElementById('mobile-menu').classList.toggle('active')
    }

    return (
        <div className="navigation">
            <div className="logo-link">
                <Link to="/">
                    <PictureFrame
                        src={logo}
                        alt={'STM Tuning, Volkswagen and Audi performance garage and repair shop.'} />
                </Link>
            </div>
            <div className="nav">
                <Link to="/">Home</Link>
                <Link to="/calendar">Calendar</Link>
                {user && user.access > 0 &&
                    <>
                        <Link to="/customers" className="staff-only">Customers</Link>
                        <Link to="/schedule" className="staff-only">Schedule</Link>
                    </>}
                {user && user.access > 1 &&
                    <>
                        <Link to="/admin" className="staff-only">Admin</Link>
                    </>}
            </div>

            <div className="account">
                {user && (
                    <>
                        {user.access > 0 && <span><u>STAFF</u>: <Link to='/details'>{user.user}</Link></span>}
                        {user.access === 0 &&
                            <Link to='/details'>{user.user}</Link>
                        }
                        <button onClick={handleClick}>Log Out</button>
                    </>)}
                {!user && (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/selfsignup'>Signup</Link>
                    </>)}
            </div>

            <div className="menu-icon">
                <span className="material-symbols-outlined menu"
                onClick={handleMenuClick}>
                    menu
                </span>
            </div>

            <div className="mobile-menu" id='mobile-menu'
            onClick={handleMenuClick}>
                <Link to="/">Home</Link>
                <Link to="/calendar">Calendar</Link>
                {user && user.access > 0 &&
                    <>
                        <Link to="/customers" className="staff-only">Customers</Link>
                        <Link to="/schedule" className="staff-only">Schedule</Link>
                    </>}
                {user && user.access > 1 &&
                    <>
                        <Link to="/admin" className="staff-only">Admin</Link>
                    </>}
                {user && (
                    <>
                        {user.access > 0 && <span><u>STAFF</u>: <Link to='/details'>{user.user}</Link></span>}
                        {user.access === 0 &&
                            <Link to='/details'>{user.user}</Link>
                        }
                        <button onClick={handleClick}>Log Out</button>
                    </>)}
                {!user && (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/selfsignup'>Signup</Link>
                    </>)}
            </div>

        </div>


    )
}

export default NavBar