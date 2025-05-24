import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';

import LoginPage from './pages/LoginPage';
import CategoryPage from './pages/CategoryPage';
import CataloguePage from './pages/CatalougePage';
import CheckoutPage from './pages/CheckoutPage';
import Navbar from './components/Navbar';

function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
       <Route path='/categories' element={isLoggedIn ? <CategoryPage/> : <Navigate to="/"/>}/>
       <Route path='/catalogue' element={isLoggedIn ? <CataloguePage/> : <Navigate to="/"/>}/>
       <Route path='/checkout' element={isLoggedIn ? <CheckoutPage/> : <Navigate to="/"/>}/>
       <Route path='*' element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  );
}
export default App;