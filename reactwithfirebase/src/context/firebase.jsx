import {createContext, useContext, useEffect, useState} from 'react';
import {intializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDA1y8BrUIMqKFbp_ZDrSFuvEotbtd_5Ts",
  authDomain: "my-app-f4b18.firebaseapp.com",
  databaseURL: "https://my-app-f4b18-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-app-f4b18",
  storageBucket: "my-app-f4b18.firebasestorage.app",
  messagingSenderId: "443448293625",
  appId: "1:443448293625:web:ebd3c5f403c60c5ca50a28"
};

const firebaseapp=initializeApp({});

const FirebaseContext = createContext(null);

export const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={FirebaseContext}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);