import {getDatabase, ref, set} from 'firebase/database';
import { app } from './firebase';
import './App.css';
 
const db=getDatabase(app);
const putdata=()=>{
  set(ref(db,'users/1'),{
    username:'John Doe',
    email:'john.doe@example.com'
  });
};

function App() {
  return (
    <div className="App">
     <h1>Welcome to My App with firebase</h1>
     <button onClick={putdata}>Put Data</button>
    </div>
  );
}

export default App;
