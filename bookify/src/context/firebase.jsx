import { createContext, useContext , useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup
    , onAuthStateChanged
 } from 'firebase/auth';

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
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = ({ children }) => {

const [user, setUser]=useState(null)

    useEffect(() => {
onAuthStateChanged(firebaseAuth, user => {
    if(user) setUser(user);
        else setUser(null)
})
    },[]);

    const signupUserWithEmailAndPassword = (email, password) => {
      return createUserWithEmailAndPassword(firebaseAuth,email ,password);
    }

    const signInUserWithEmailAndPassword = (email, password) => {
      return signInWithEmailAndPassword(firebaseAuth, email, password);
    }
    const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    const isLoggedIn = user ? true : false ;

 

  return <FirebaseContext.Provider value={{ signInWithGoogle, signupUserWithEmailAndPassword, signInUserWithEmailAndPassword , isLoggedIn }}>{children}</FirebaseContext.Provider>;
};