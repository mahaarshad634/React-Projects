import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => alert('User created successfully'))
      .catch((error) => alert(error.message));
  };

  const signUpWithGoogle = () => {
    signInWithRedirect(auth, googleProvider);
  };

  return (
    <div className="signup">
      <h1>Signup Page</h1>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={signUpWithGoogle}>Sign Up with Google</button>
      <button onClick={createUser}>Sign Up</button>
    </div>
  );
};

export default Signup;