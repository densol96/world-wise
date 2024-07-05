import { createContext, useContext, useState, useEffect } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:1234";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
        console.log(data);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  async function getCity(id) {
    try {
      setCurrentCity({});
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const city = await res.json();
      setCurrentCity(city);
    } catch (e) {
      alert("Something went wrong.. :(");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiesContext() {
  return useContext(CitiesContext);
}

export { CitiesProvider, useCitiesContext };
