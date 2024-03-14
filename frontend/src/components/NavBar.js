import { Link } from "react-router-dom"
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"

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
                <Link to="/users">
                    <h2>Users</h2>
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
            </div>
        </header>
    )
}

export default NavBar