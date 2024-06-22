import './styles/App.css'
import { 
	BrowserRouter as Router, 
	Routes, 
	Route,
	Navigate } from 'react-router-dom'
import { Navbar } from './layout/Navbar'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { CreateItems } from './pages/CreateItems'
import { EditItems } from './pages/EditItems'
import { Card } from './pages/Cart'
import { Buy } from './pages/Buy.jsx'
import { NotFound } from './pages/NotFound'

function App() {
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login"/>} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/EditItems" element={<EditItems/>} />
          <Route path="/CreateItems" element={<CreateItems/>} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/Buy" element={<Buy/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
