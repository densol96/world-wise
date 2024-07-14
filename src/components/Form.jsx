// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCitiesContext } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { createCity, isLoading: submitingIsLoading } = useCitiesContext();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState(null);

  const [apiEndIsLoading, setApiEndIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { lat, lng } = useUrlPosition();

  useEffect(() => {
    if (!lat || !lng) return;
    (async () => {
      try {
        setApiEndIsLoading(true);
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        setCityName(data.city);
        setCountry(data.countryName);
        setErrorMessage("");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (e) {
        setErrorMessage("Service is currently unavailable..");
      } finally {
        setApiEndIsLoading(false);
      }
    })();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date)
      return alert("ALl the required field must be filled in");

    const requestBody = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(requestBody);
    navigate("/app/cities");
  }

  if (apiEndIsLoading) return <Spinner />;

  if (errorMessage) return <Message>{errorMessage}</Message>;

  if (!lat || !lng) return <Message>Start by clicking on the page</Message>;

  return (
    <form
      className={`${styles.form} ${submitingIsLoading ? styles.loading : ""}`}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          type="datetime-local"
          max={formatDate(new Date())}
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={formatDate(new Date())}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">
          {!submitingIsLoading ? "Add" : "Loading.."}
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
