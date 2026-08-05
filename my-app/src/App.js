//import {getDatabase, ref, set} from 'firebase/database';
import { getAuth, signOut, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { app } from './firebase';
import { useState, useEffect } from 'react';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import './App.css';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);
    });

    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          console.log('Redirect sign-in result:', result.user);
        }
      })
      .catch((error) => {
        console.error('Redirect sign-in error:', error);
      });

    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  if (initializing) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="App">
        <h1>Welcome to My App with firebase</h1>
        <p>Please sign in or sign up.</p>
        <Signup />
        <Signin />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Hello {user.displayName || user.email}</h1>
      <p>Signed in as {user.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default App;
