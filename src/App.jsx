/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom';

import Product from './pages/Product/Product';
import Pricing from './pages/Pricing/Pricing';
import Homepage from './pages/HomePage/Homepage';
import Login from './pages/Login/Login';
import AppLayout from './pages/AppLayout/AppLayout';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import CityList from './components/CityList/CityList';
import CountryList from './components/CountryList/CountryList';
import City from './components/City/City';
import Form from './components/Form/Form';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function updateIsLoading(status) {
    setIsLoading(status);
  }

  function updateError(error) {
    setError(error);
  }

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
            <Route index replace element={<Navigate to="cities" />} />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="cities/:id"
              element={
                <City
                  updateIsLoading={updateIsLoading}
                  updateError={updateError}
                  error={error}
                />
              }
            />
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
