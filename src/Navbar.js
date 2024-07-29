import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const NavbarComponent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSignInPage = location.pathname === '/sign-in';

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/" className={isHomePage ? 'active' : ''}>
        Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            as={Link}
            to="/sign-in"
            className={isSignInPage ? 'active' : ''}
          >
            Sign In
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
