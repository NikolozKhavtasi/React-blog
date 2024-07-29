import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import NavbarComponent from './Navbar';

const SignInSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate('/');
    } catch (err) {
      console.error('Sign-up/Sign-in failed:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <NavbarComponent />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {error && <p className="text-danger mt-3">{error}</p>}
              <Button variant="primary" type="submit" className="mt-3">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </Form>
            <Button
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="mt-3 d-block"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignInSignUp;
