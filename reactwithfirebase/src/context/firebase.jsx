import {createContext, useContext, useEffect, useState} from 'react';
import {intializeApp} from 'firebase/app';

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