import React,{useState} from "react";
import {getAuth , signInWithEmailAndPassword} from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signinUser = () => {
    signInWithEmailAndPassword(auth, email, password).then(valu => alert('sigin success')).catch((error) => console.log(error));
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
        </div>
    )
}

export default Signin;