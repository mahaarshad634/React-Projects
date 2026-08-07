import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from 'react-router-dom';
//components
import MyNav from "./Components/navbar.jsx";
//pages
import RegisterPage from './Pages/Register.jsx';
import LoginPage from './Pages/Login.jsx';

//css

import './App.css';

function App() {
  return (
    <div>
      <MyNav/>
    <Routes>
      <Route path="/" element={<h1>Welcome to Bookify</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </div>
  );
}

export default App;
      
