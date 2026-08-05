//import {getDatabase, ref, set} from 'firebase/database';
import {getAuth , createUserWithEmailAndPassword} from 'firebase/auth';
import { app } from './firebase';
import './App.css';

const auth = getAuth(app);
 
// const db=getDatabase(app);
// const putdata=()=>{
//   set(ref(db,'users/maha'),{
//     username:'maha arshad',
//     email:'maha@example.com'
//   });
// };

function App() {
  const  signUpUser=()=>{
    createUserWithEmailAndPassword(auth,'mahaarshad123@example.com','maha123').then((value)=> console.log(value))};
  return (
    <div className="App">
     <h1>Welcome to My App with firebase</h1>
     <button onClick={signUpUser}>Sign Up</button>
    </div>
  );
}

export default App;
