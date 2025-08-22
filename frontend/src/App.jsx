import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/global/Login';
import Register from './components/global/Register';
import Admin from './components/admin/Admin';
import Home from './components/customer/Home';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/products" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
