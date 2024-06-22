import { 
	BrowserRouter as Router, 
	Routes, 
	Route,
	Navigate } from 'react-router-dom';

import { Items } from './pages/Items';
import { CreateItems } from './pages/CreateItems';
import { EditItems } from './pages/EditItems';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Items" element={<Items />} />
          <Route path="/EditItems" element={<EditItems/>} />
          <Route path="/CreateItems" element={<CreateItems/>} />
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <PrivateRoute path="/dashboard" element={<Dashboard />} />
          <PrivateRoute path="/editItems" element={<EditItems />} />
          <PrivateRoute path="/createItems" element={<CreateItems />} />
          <PrivateRoute path="/item/:id" element={<ItemDetails />} />
          <PrivateRoute path="/cart" element={<Cart />} />
          <PrivateRoute path="/buy" element={<Buy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
