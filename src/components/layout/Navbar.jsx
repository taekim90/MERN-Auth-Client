import { Link } from "react-router-dom";
// REACT BOOTSTRAP IMPORTS NEEDED
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function reactBootstrapNavbar({ handleLogout, currentUser }) {
    // export default function Navbar({ handleLogout, currentUser }) {
    // if the user is logged in
    const loggedIn = ( // this is a parenthesis not an object
        <>
            {/* If the user is logged in... */}
            <Link to="/">
                {/* todo: app function to logout */}
                <span onClick={handleLogout}>Log Out</span>
            </Link>

            <Link to="/profile">Profile</Link>
        </>
    );

    // if the user is logged out
    const loggedOut = (
        <>
            {/* If the user is logged out... */}
            <Link to="/register">Register</Link>

            <Link to="/login">Log In</Link>
        </>
    );

    return (
        <>
            {/* NON BOOTSTRAP NAVBAR */}
            {/* <nav>
                <Link to='/'>User App</Link>

                {currentUser ? loggedIn : loggedOut}
            </nav> */}

            {/* BOOTSTRAP NAVBAR - use of classNames*/}
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link disabled">Disabled</a>
                    </li>
                </ul>
                <form className="d-flex">
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
            </nav> */}

            {/* REACT BOOTSTRAP NAVBAR - need to import at the top */}
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#home">Home</Nav.Link> */}
                            <Nav.Link>
                                <Link to="/">Home/User App</Link>
                            </Nav.Link>
                            <Nav.Link>{currentUser ? loggedIn : loggedOut}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
