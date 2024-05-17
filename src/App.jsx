/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/Product/Product';
import Pricing from './pages/Pricing/Pricing';
import Homepage from './pages/HomePage/Homepage';
import Login from './pages/Login/Login';
import AppLayout from './pages/AppLayout/AppLayout';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppLayout />} />
          {/* <Route path="*" element={<NotFound />} />  */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
