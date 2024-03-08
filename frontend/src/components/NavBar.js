import { Link } from "react-router-dom"

const NavBar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>STM Home</h1>
                </Link>
                <nav>
                    <div>
                        <Link to='/login'>Login</Link>
                        <Link to='/selfsignup'>Signup</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default NavBar