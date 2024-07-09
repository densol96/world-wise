import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";

const DEFAULT_POSITION = [51.505, -0.09];
const DEFAULT_ZOOM_OUT = 13;
const DEFAULT_ZOOM_IN = 14;

function Map() {
  const { lat, lng } = useUrlPosition();

  const navigate = useNavigate();

  const { cities } = useCitiesContext();

  const [mapPosition, setMapPositon] = useState(DEFAULT_POSITION);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM_OUT);

  function zoomIn() {
    setMapZoom(DEFAULT_ZOOM_IN);
  }

  function zoomOut() {
    setMapZoom(DEFAULT_ZOOM_OUT);
  }

  useEffect(() => {
    if (lat && lng) {
      setMapPositon([lat, lng]);
    }
  }, [lat, lng]);

  // On first render, useGeButtonolocation to get user's current position
  const {
    isLoading: geoLocationIsLoading,
    position: geoLocationPosition,
    error,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (geoLocationPosition)
      setMapPositon([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition, error]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={(e) => getPosition()}>
          {geoLocationIsLoading ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={mapZoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => {
          return (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                {city.emoji} {city.cityName}
              </Popup>
            </Marker>
          );
        })}
        <ChangePosition position={mapPosition} />
        <HandleClickOnTheMap action={zoomIn} />
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function HandleClickOnTheMap({ action }) {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
}

export default Map;
