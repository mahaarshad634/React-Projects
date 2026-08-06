import { useState } from 'react'
import { getFirestore, collection, addDoc, doc, getDoc, where ,query ,getDocs, updateDoc,} from 'firebase/firestore'
import './App.css'
import { app } from './firebase'

const firestore = getFirestore(app)

function App() {
 const writeData = async () => {
  const result = await addDoc(collection(firestore, 'cities'), {
    name: 'Lahore',
    pinCode: 54000,
    country: 'Pakistan'
  });
  console.log('Result:', result);
 }

 const makeSubCollection = async () => {
  const result = await addDoc(collection(firestore, 'cities', 'TfLk7sBsCeQ0qaAeTs53', 'subCollection'), {
    name: 'Lahore SubCollection',
    pinCode: 54000,
    country: 'Pakistan'
  });
  console.log('SubCollection Result:', result);
 };

 const getDocument = async () => {
  try {
    const docRef = doc(firestore, 'cities', 'TfLk7sBsCeQ0qaAeTs53');
    const snap = await getDoc(docRef);
    console.log('Document Data:', snap.exists() ? snap.data() : null);
  } catch (error) {
    console.error('Get document error:', error);
  }

 };

 const getDocumentWithQuery = async () => {
const collecionRef= collection(firestore, 'cities');
const q = query(collecionRef, where('name', '==', 'Lahore'));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log('Queried Document Data:', doc.data());
});

 } 

 const update= async () => {
  const docRef = doc(firestore, 'USER-001', 'QwuTrxfRy3HB8OEGFoiZ');
  await updateDoc(docRef, {
    name: 'Maha',
    Age: 22,
    
  });
  console.log('Document updated successfully.');

 }
  return (
    <>
     <h1>Vite + React firestore</h1>
    <button onClick={writeData}>Write Data</button>
    <button onClick={makeSubCollection}>Make Sub Collection</button>
    <button onClick={getDocument}>Get Document</button>
    <button onClick={getDocumentWithQuery}>Get Document With Query</button>
    <button onClick={update}>Update Document</button>

    </>
  )
}

export default App
