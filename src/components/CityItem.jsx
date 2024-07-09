import { useCitiesContext } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, position } = city;
  const { lat, lng } = position;

  const { currentCity, deleteCity } = useCitiesContext();

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          city.id === currentCity.id ? styles[`cityItem--active`] : ""
        }`}
        to={`${city.id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <span className={styles.date}>{formatDate(date)}</span>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            deleteCity(city.id);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
