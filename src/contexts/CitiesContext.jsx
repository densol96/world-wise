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

  async function createCity(city) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (e) {
      alert("There was an error creatung the city..");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      const updatedCities = cities.filter((city) => city.id !== id);
      setCities(updatedCities);
    } catch (e) {
      alert("There was an error deleting the city..");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiesContext() {
  return useContext(CitiesContext);
}

export { CitiesProvider, useCitiesContext };
