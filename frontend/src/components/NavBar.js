import { Link } from "react-router-dom"

const NavBar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>STM Home</h1>
                </Link>
                <Link to="/users">
                    <h2>Users</h2>
                </Link>
            </div>
        </header>
    )
}

export default NavBar