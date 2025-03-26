import React, { useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Header from './headeCmp'; // Assuming this is your custom Header component
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<{ name: string; email: string; mobile: string; userId: string }>({
    name: "",
    email: "",
    mobile: "",
    userId: ""
  });
const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const sendData = sessionStorage.getItem('USERDATA');
    const jsonData = sendData ? JSON.parse(sendData) : null;

    if (jsonData && jsonData[0]?.userId) {
      formData.userId = jsonData[0]?.userId;
    }

    try {
      // Make the API call using axios
      const response = await axios.post('http://localhost:2025/api/emp/post', formData);
      console.log("RES", response.data);
      if(response.data.message !== ""){
        navigate('/home')
      }
    } catch (err) {
      console.error('Error:', err);
      // Handle error
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Form method="post" onSubmit={submitForm}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Name"
                onChange={handleChange}
                value={formData.name}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter Email"
                onChange={handleChange}
                value={formData.email}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridMobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              name="mobile"
              type="text"
              placeholder="Enter Mobile"
              onChange={handleChange}
              value={formData.mobile}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UserForm;
