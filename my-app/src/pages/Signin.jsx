import React,{useState} from "react";
import {getAuth , signInWithEmailAndPassword} from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState('');

    const signinUser = async () => {
        setFeedback('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setFeedback('Signed in successfully.');
        } catch (error) {
            console.error('Email sign-in error:', error);
            setFeedback(error.message || 'Sign-in failed.');
        }
    };

    return(
        <div className="signin">
            <h1>Signin Page</h1>
            <label htmlFor="email">Email</label>
            <input
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
            />
            <label htmlFor="password">Password</label>
            <input 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
            />
            
            <button onClick={signinUser}>Sign In</button>
            {feedback && <p style={{ color: 'red', marginTop: '10px' }}>{feedback}</p>}
        </div>
    )
}

export default Signin;