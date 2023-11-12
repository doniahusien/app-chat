import React from 'react';
import {  BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUP';
import { useFirebase } from './context/Auth';


function App() {
  const {auth} = useFirebase();

  const PrivateRoute = ({ children }) => {
    if (!auth) {
      return <Navigate to = '/login' />
    }
    return children
  }
  return (
 
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<PrivateRoute>
          <Home />
        </PrivateRoute>} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>

  );
}

export default App;
