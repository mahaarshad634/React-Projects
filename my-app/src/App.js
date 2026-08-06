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
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (isMounted) {
        setUser(currentUser);
        setInitializing(false);
      }
    });

    const resolveRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (isMounted && result?.user) {
          setUser(result.user);
        }
      } catch (error) {
        console.error('Redirect sign-in error:', error);
      } finally {
        if (isMounted) {
          setInitializing(false);
        }
      }
    };

    resolveRedirectResult();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
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
        <h1>Welcome to My App with Firebase</h1>
        <p>Please sign in or sign up to continue.</p>
        <Signup />
        <Signin />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Hello, {user.displayName || user.email?.split('@')[0] || 'there'}!</h1>
      <p>Signed in as {user.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default App;
