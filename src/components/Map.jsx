import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h2>MAP</h2>
      <p>
        Position: {lat} / {lng}
      </p>
      <button
        onClick={(e) => {
          setSearchParams({
            lat: 1,
            lng: 1,
          });
        }}
      >
        Change position
      </button>
    </div>
  );
}

export default Map;
