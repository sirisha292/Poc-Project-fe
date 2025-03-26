import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import './styles.css'
interface LoginProps {
    showDesign: React.Dispatch<React.SetStateAction<boolean>>
  }
const Login: React.FC<LoginProps> = ({showDesign}) => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // if (!email || !password) {
    //   setError('Please fill in both fields');
    //   return;
    // }

    // // Call API or validation logic here
    // console.log('Login credentials:', { email, password });
    // setError(''); // Clear error message on successful login
    showDesign(true)
    try {
      // Make the API call using axios
      const response = await axios.post('http://localhost:2025/api/login/post', {
        userId,
        password
      });
      
   
      //console.log("RES",response.data)

      if (response.data.data.length > 0) {
        //console.log("LogedInnnn")
        sessionStorage.setItem("USERDATA", JSON.stringify(response.data.data))
        navigate('/home');
       // showDesign(true);
       // sessionStorage.setItem(response.data);
        setError(''); // Clear any previous errors on success
      } else {
        setError('Invalid credentials, please try again');
      }
    } catch (err) {
      // Handle error and update error state
      setError('An error occurred. Please try again later.');
    } finally {
      // Stop loading
      setLoading(false);
    }
  
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className="text-center mb-4">
            <h2>Login</h2>
          </div>
          <Form onSubmit={handleLogin}>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Id</Form.Label>
              <Form.Control
                type="string"
                placeholder="User Id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              Login
            </Button>

            <div className="mt-3 text-center">
              <a href="/forgot-password">Forgot password?</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
