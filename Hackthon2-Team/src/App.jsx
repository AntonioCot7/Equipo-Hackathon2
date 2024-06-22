import './styles/App.css'
import { 
	BrowserRouter as Router, 
	Routes, 
	Route,
	Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
function App() {
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login"/>} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/register" element={<Register/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
