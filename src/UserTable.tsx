import Table from 'react-bootstrap/Table';
import Header from './headeCmp';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from "react";
//import { useLocation } from 'react-router-dom';

interface ApiResponse{

  name: string;
  email:string;
  mobile:number;

}
const UserTable: React.FC = () => {
  const[data, setData]= useState<ApiResponse | null>(null);
  const[loading,setLoading] = useState<boolean>(false);
  const[error,setError] = useState<string | null> (null);
  //const location = useLocation();
  const [EmployeeData, setEmployeeData] = useState<any>([])
  //const { myData } = location.state || {};
  
  
  //api call
  const getUser = async (data:any) => {
    
    try {
      // Make the API call using axios
      const response = await axios.post('http://localhost:2025/api/emp/getById', data);
      //console.log("RES",response.data)

      if (response.data.data.length > 0) {
        setEmployeeData(response.data.data)
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
 useEffect(()=>{
  const sendData:any = sessionStorage.getItem("USERDATA")
  const jsondata :any = JSON.parse(sendData)
  console.log(jsondata, "jsondata")
  const userSendData :any = {userId : jsondata[0]?.userId, userType : jsondata[0]?.userType}
 
  getUser(userSendData)
 },[])
 console.log(EmployeeData, "EmployeeData")
  return (
    <> <Header/>
    <Container className="mb-3">
      <Form>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S:NO</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {EmployeeData?.length > 0 ? EmployeeData.map((item:any, key:any) =>(
           <tr key={item.id}>
           <td>{key+1}</td>
           <td>{item.name}</td>
           <td>{item.email}</td>
           <td>{item.mobile}</td>
         </tr>
        )):<span>no data </span>}
       
      </tbody>
    </Table>
    </Form>
    </Container>
    </>
  );
};


export default UserTable;