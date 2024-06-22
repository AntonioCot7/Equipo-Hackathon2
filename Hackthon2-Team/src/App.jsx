import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  Navigate } from 'react-router-dom';

import { Items } from './pages/Items';
import { CreateItems } from './pages/CreateItems';
import { EditItems } from './pages/EditItems';
import { ItemDetails } from './pages/ItemDetails';
import { DeleteItem } from './pages/DeleteItem';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/items" element={<Items />} />
          <Route path="/create" element={<CreateItems />} />
          <Route path="/edit/:id" element={<EditItems />} />
          <Route path="/details/:id" element={<ItemDetails />} />
          <Route path="/delete/:id" element={<DeleteItem />} />
          {/* Redirecciona a /items si la ruta no coincide con ninguna anterior */}
          <Route path="*" element={<Navigate to="/items" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;