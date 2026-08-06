import { useState } from 'react'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
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

  return (
    <>
     <h1>Vite + React firestore</h1>
     <button onClick={writeData}>Write Data</button>

    </>
  )
}

export default App
