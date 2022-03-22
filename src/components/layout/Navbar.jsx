import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav>
            <Link to='/'>User App</Link>

            {/* If the user is logged in... */}
            <Link to='/'>
                {/* todo: app function to logout */}
                <span>Log Out</span>
            </Link>

            <Link to='/profile'>Profile</Link>

            {/* If the user is logged out... */}
            <Link to='/register'>Register</Link>

            <Link to='/login'>Log In</Link>
        </nav>
    )
} 