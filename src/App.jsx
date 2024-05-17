/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/Product/Product';
import Pricing from './pages/Pricing/Pricing';
import Homepage from './pages/HomePage/Homepage';
import Login from './pages/Login/Login';
import AppLayout from './pages/AppLayout/AppLayout';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import CityList from './components/CityList/CityList';
import { useEffect, useState } from 'react';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:4321/cities');
        const data = await response.json();
        setCities(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path="countries" element={'COUNTRIES'} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
