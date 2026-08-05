//import {getDatabase, ref, set} from 'firebase/database';
import {getAuth , createUserWithEmailAndPassword} from 'firebase/auth';
import { app } from './firebase';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
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
    createUserWithEmailAndPassword(auth,'mahaarshad123@examplecom','maha123').then((value)=> console.log(value))};
  return (
    <div className="App">
     <h1>Welcome to My App with firebase</h1>
     <Signup />
     <Signin /> 
    </div>
  );
}

export default App;
