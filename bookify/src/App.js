import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from 'react-router-dom';
//pages
import RegisterPage from './Pages/Register.jsx';

//css

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome to Bookify</h1>} />
      <Route path="/about" element={<h1>About Bookify</h1>} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
      
