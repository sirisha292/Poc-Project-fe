import React,{useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header: React.FC = () => {
  const  [userId, setUserId] =useState<string>("")
  const [userRole, setUserRole] = useState<string>("")
  useEffect(()=>{
    const sendData:any = sessionStorage.getItem("USERDATA")
    const jsondata :any = JSON.parse(sendData)
    setUserId(jsondata[0]?.userId)
    setUserRole(jsondata[0]?.userType)
  },[])
  return (
    <Navbar expand="sm" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">POC PROJECT</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          {(!userRole.includes("ADMIN"))&& <Nav.Link href="/userForm">Add User</Nav.Link>}
        </Nav>
        <Navbar.Text>USERID : {userId}</Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}

export default Header;
