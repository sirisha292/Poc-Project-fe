import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Header from './headeCmp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './UserForm';
import UserTable from './UserTable';
function App() {
  const [showheader, setHeader] =  useState<boolean>(false);
  return (
    <div className="App">
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Login showDesign = {setHeader} />} />
        <Route path="/userForm" element={<UserForm/>} />
        <Route path="/home" element={<UserTable />} />

      </Routes>
    
    </div>
  );
}

export default App;
