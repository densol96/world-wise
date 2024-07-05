import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCitiesContext } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCitiesContext();

  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Add your first city to the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
