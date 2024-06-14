import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

const NavigationBar = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className={location.pathname !== '/' ? 'fade-out' : ''}>
            Home
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
