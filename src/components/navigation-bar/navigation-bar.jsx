import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({user, onLoggedOut, setQuery}) => {
    return (
        <>
            <Navbar bg="dark" expand="sm" bg="primary" className="nav navbar-dark" >
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        Harmonix
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signup">
                                Signup
                            </Nav.Link>
                        </>
                        )}
                        {user && (
                        <>
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/profile">
                                Profile
                            </Nav.Link>
                            <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                        </>
                        )}
                    </Nav>
                    <Navbar.Text>Search Songs:</Navbar.Text>
                    <input 
                        type='text' 
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};