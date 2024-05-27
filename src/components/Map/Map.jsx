import styles from './Map.module.css';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  console.log(lat, lng);
  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}></div>
  );
}

export default Map;
