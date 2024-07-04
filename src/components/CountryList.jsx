import styles from "./CountryList.module.css";

import Spinner from "./Spinner";
import CityItem from "./CityItem";
import CountryItem from "./CountryItem";
import Message from "./Message";

function citiesToCountries(cities) {
  const countries = [];
  for (let item of cities) {
    let forAdd = true;
    for (let country of countries) {
      if (item.country === country.country) {
        forAdd = false;
      }
    }
    forAdd &&
      countries.push({
        country: item.country,
        emoji: item.emoji,
        id: item.id,
      });
  }
  return countries;
}

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Add your first city to the map" />;

  return (
    <ul className={styles.countryList}>
      {citiesToCountries(cities).map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
