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
        </Routes>
      </Router>
    </>
  )
}

export default App;
