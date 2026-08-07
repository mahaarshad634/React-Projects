import { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const FirebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: 'AIzaSyA5fmaWIm7Z1lZUn5h0Qmzd06jG5YNfFyU',
  authDomain: 'bokify-67186.firebaseapp.com',
  projectId: 'bokify-67186',
  storageBucket: 'bokify-67186.firebasestorage.app',
  messagingSenderId: '975569574298',
  appId: '1:975569574298:web:e91ae569368bd068564223',
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp= initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export const FirebaseProvider = ({ children }) => {

    const signupUserWithEmailAndPassword = (email, password) => {
      return createUserWithEmailAndPassword(firebaseAuth,email ,password);
    }
  return <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword }}>{children}</FirebaseContext.Provider>;
};