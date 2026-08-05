import { useState } from 'react';
import { useFirebase } from './context/firebase.jsx';

import './App.css'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signupUserWithEmailAndPassword, putData } = useFirebase();

  const handleSignup = () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    signupUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert('Signup successful');
        console.log(userCredential);
        // persist a simple user record in the Realtime Database
        putData('users/maha', {
          username: 'maha arshad',
          email: email,
          password: password
        }).catch((err) => console.error('putData error', err));
      })
      .catch((error) => {
        console.error(error);
        alert(error.message || 'Signup failed');
      });
  };

  return (
    <div className="App">
      <h1>Welcome to My App with firebase</h1>
      <input className="email-input mx-2 my-2"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input className="password-input mx-2 my-2"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  )
}

export default App
