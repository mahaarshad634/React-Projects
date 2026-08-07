import { useState } from 'react';
import { useFirebase } from './context/firebase.jsx';

import './App.css'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [savedData, setSavedData] = useState(null);
  const { signupUserWithEmailAndPassword, putData, getData } = useFirebase();

  const putDataNew = async () => {
    try {
      await putData('grandfather/father/child', {
        id: 1,
        name: 'Shakeel',
        Age: 21,
        degree: 'BSSE',
        language: 'german'
      });

      const data = await getData('grandfather/father/child');
      setSavedData(data);
      setMessage('Data written successfully.');
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Failed to save data.');
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await signupUserWithEmailAndPassword(email, password);
      console.log(userCredential);

      await putData('users/maha', {
        username: 'maha arshad',
        email,
        password
      });

      const data = await getData('users/maha');
      setSavedData(data);
      setMessage('Signup successful. Your data is now visible below.');
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Signup failed');
    }
  };

  return (
    <div className="App">
      <h1>Welcome to My App with firebase</h1>
      <input
        className="email-input mx-2 my-2"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="password-input mx-2 my-2"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={putDataNew}>Put Data</button>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}

      {savedData && (
        <div style={{ marginTop: '1rem', textAlign: 'left' }}>
          <h2>Saved data</h2>
          <pre>{JSON.stringify(savedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
