import { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDA1y8BrUIMqKFbp_ZDrSFuvEotbtd_5Ts",
  authDomain: "my-app-f4b18.firebaseapp.com",
  databaseURL: "https://my-app-f4b18-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-app-f4b18",
  storageBucket: "my-app-f4b18.firebasestorage.app",
  messagingSenderId: "443448293625",
  appId: "1:443448293625:web:ebd3c5f403c60c5ca50a28"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDatabase = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => set(ref(firebaseDatabase, key), data);

  return (
    <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, putData }}>
      {children}
    </FirebaseContext.Provider>
  );
};