import styles from './City.module.css';

import useEmojiParser from '../../helper/useEmojiParser';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Button from '../Button/Buttton';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

function City({ updateIsLoading, updateError, error }) {
  const [city, setCity] = useState({});
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        updateIsLoading(true);
        const response = await fetch(`http://localhost:4321/cities/${id}`);
        const data = await response.json();
        setCity(data);
        updateError('');
      } catch (e) {
        updateError(e);
      } finally {
        updateIsLoading(false);
      }
    })();
  }, []);

  const { cityName, emoji, date, notes } = city;

  useEmojiParser([city]);

  const navigate = useNavigate();

  return (
    <div className={styles.city}>
      {error && <h2>{error}</h2>}
      {!error && (
        <>
          <div className={styles.row}>
            <h6>City name</h6>
            <h3>
              <span>{emoji}</span> {cityName}
            </h3>
          </div>

          <div className={styles.row}>
            <h6>You went to {cityName} on</h6>
            <p>{formatDate(date || null)}</p>
          </div>

          {notes && (
            <div className={styles.row}>
              <h6>Your notes</h6>
              <p>{notes}</p>
            </div>
          )}

          <div className={styles.row}>
            <h6>Learn more</h6>
            <a
              href={`https://en.wikipedia.org/wiki/${cityName}`}
              target="_blank"
              rel="noreferrer"
            >
              Check out {cityName} on Wikipedia &rarr;
            </a>
          </div>

          <div>
            <Button type="back" onClick={() => navigate(-1)}>
              Go back
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default City;
