import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:1234";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: "" };
    case "error":
      return {
        ...state,
        error: "Unable to load the cities/city with CitiesProvider",
      };
    case "citiesLoaded":
      return { ...state, isLoading: false, error: "", cities: action.payload };
    case "cityLoaded":
      return {
        ...state,
        isLoading: false,
        error: "",
        currentCity: action.payload,
      };
    case "cityCreated":
      return {
        ...state,
        isLoading: false,
        error: "",
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cityDeleted":
      return {
        ...state,
        isLoading: false,
        error: "",
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      throw new Error(
        "Invalid action in CitiesContext reducer function: " + action.type
      );
  }
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;
  useEffect(() => {
    dispatch({ type: "loading" });
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "citiesLoaded", payload: data });
      } catch (e) {
        dispatch({ type: "error" });
        console.log(e);
      }
    })();
  }, []);

  const getCity = useCallback(async function (id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const city = await res.json();
      dispatch({ type: "cityLoaded", payload: city });
    } catch (e) {
      dispatch({ type: "error" });
    }
  }, []);

  async function createCity(city) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      dispatch({ type: "cityCreated", payload: data });
    } catch (e) {
      dispatch({ type: "error" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cityDeleted", payload: id });
    } catch (e) {
      dispatch({ type: "error" });
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
