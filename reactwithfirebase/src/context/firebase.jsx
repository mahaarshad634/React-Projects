import { createContext, useContext ,useState ,useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, get, child,onValue } from 'firebase/database';

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

export const FirebaseContext = createContext(null);

export function useFirebase() {
  return useContext(FirebaseContext);
}

export const FirebaseProvider = ({ children }) => {
  const [name, setName] = useState('');

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => set(ref(firebaseDatabase, key), data);

  const getData = (path) => {
    return get(child(ref(firebaseDatabase), path)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    });
  };

  useEffect(() => {
    const dataRef = ref(firebaseDatabase, 'grandfather/father/child');
    onValue(dataRef, (snapshot) => {
      const value = snapshot.val();
      setName(value?.name || '');
    });
  }, []);

  return (
    <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, putData, getData, name }}>
      <h2>Name is {name}</h2>
      {children}
    </FirebaseContext.Provider>
  );
};