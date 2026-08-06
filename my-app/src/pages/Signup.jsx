import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const createUser = () => {
    setFeedback('');
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => setFeedback('User created successfully.'))
      .catch((error) => {
        console.error('Email sign-up error:', error);
        setFeedback(error.message || 'Email sign-up failed.');
      });
  };

  const signUpWithGoogle = async () => {
    setFeedback('');
    try {
      await signInWithPopup(auth, googleProvider);
      setFeedback('Google sign-in successful.');
    } catch (error) {
      console.error('Google sign-in error:', error);
      if (error.code === 'auth/popup-blocked') {
        try {
          await signInWithRedirect(auth, googleProvider);
          setFeedback('Redirecting to Google sign-in...');
        } catch (redirectError) {
          console.error('Google redirect sign-in error:', redirectError);
          setFeedback(redirectError.message || 'Google sign-in failed.');
        }
      } else {
        setFeedback(error.message || 'Google sign-in failed.');
      }
    }
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
      {feedback && <p style={{ color: 'red', marginTop: '10px' }}>{feedback}</p>}
    </div>
  );
};

export default Signup;