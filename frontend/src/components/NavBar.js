import { Link } from "react-router-dom"
import './styles/NavBar.css'

const NavBar = ({children}) => {

    return (
        <header>
            {children}
            <div className="navigation">
                <Link to="/">Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/selfsignup'>Signup</Link>
            </div>
        </header>
    )
}

export default NavBar