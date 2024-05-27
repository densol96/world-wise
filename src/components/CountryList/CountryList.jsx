import twemoji from 'twemoji';
import { useEffect } from 'react';

import styles from './CountryList.module.css';
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';
import CountryItem from '../CountryItem/CountryItem';

function reduceToCountries(cities) {
  const countries = [];
  for (let city of cities) {
    let contains = false;
    for (let country of countries) {
      if (city.country == country.country) {
        contains = true;
      }
    }
    if (!contains) {
      countries.push({ country: city.country, emoji: city.emoji, id: city.id });
    }
  }
  return countries;
}

function CountryList({ cities, isLoading }) {
  useEffect(() => {
    twemoji.parse(document.body);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    return (
      <Message message={'Add your first city by a location on the map!'} />
    );
  }

  const countries = reduceToCountries(cities);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
