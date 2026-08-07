import React, {useState, useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase} from '../context/firebase.jsx';

const LoginPage = () => {
 const firebase = useFirebase();
 const navigate= useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

useEffect(()=>{
    if(firebase.isLoggedIn){
       navigate("/")
    }
},[firebase, navigate])

   console.log(firebase);
const handleSubmit = async (e) => {
 e.preventDefault();
 console.log('Login in user.....')
const result = await firebase.signInUserWithEmailAndPassword(email,password);
console.log('user logged in successfully', result);
}


    return (
        <div className="container mt-5">
           <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e) => setEmail(e.target.value)}  value ={email}type="email" placeholder="Enter email" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Log IN
      </Button>
    </Form>
    <h3 className="mt-5 mb-5">OR</h3>
    <Button onClick= {() => firebase.signInWithGoogle()} variant="outline-danger" type="submit">SignIn with Google</Button>
        </div>
    );
};

export default LoginPage;
