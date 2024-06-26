import CityItem from '../CityItem/CityItem';
import Spinner from '../Spinner/Spinner';
import Message from '../Message/Message';

import styles from './CityList.module.css';

function CityList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    return (
      <Message message={'Add your first city by a location on the map!'} />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
