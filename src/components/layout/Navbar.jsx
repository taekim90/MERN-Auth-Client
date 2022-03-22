import { Link } from "react-router-dom"

export default function Navbar({ handleLogout, currentUser }) {
    // if the user is logged in
    const loggedIn = ( // this is a parenthesis not an object
        <>
            {/* If the user is logged in... */}
            <Link to='/'>
                {/* todo: app function to logout */}
                <span onClick={handleLogout}>Log Out</span>
            </Link>

            <Link to='/profile'>Profile</Link>
        </>
    )

    // if the user is logged out
    const loggedOut = (
        <>
            {/* If the user is logged out... */}
            <Link to='/register'>Register</Link>

            <Link to='/login'>Log In</Link>
        </>
    )

    return (
        <nav>
            <Link to='/'>User App</Link>

            {currentUser ? loggedIn : loggedOut}

        </nav>
    )
} 