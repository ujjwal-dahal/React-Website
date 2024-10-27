import { useState, useEffect } from "react";
import styles from "./Weather.module.css";

export default function Weather() {
  const [location, setLocation] = useState("London");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const fetchWeather = async (city) => {
    try {
      
      const locationResponse = await fetch(
        `https://www.metaweather.com/api/location/search/?query=${city}`
      );
      const locationData = await locationResponse.json();

      if (locationData.length === 0) {
        throw new Error("City not found");
      }

      const woeid = locationData[0].woeid; 

      
      const weatherResponse = await fetch(
        `https://www.metaweather.com/api/location/${woeid}/`
      );
      const weatherResult = await weatherResponse.json();

      setWeatherData(weatherResult);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    fetchWeather(location);
  };

  return (
    <div className={styles.weatherContainer}>
      <h1 className={styles.title}>Weather App</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={location}
          onChange={handleChange}
          placeholder="Enter city name"
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {weatherData && (
        <div className={styles.weatherInfo}>
          <h2 className={styles.city}>{weatherData.title}</h2>
          <p className={styles.temperature}>
            {Math.round(weatherData.consolidated_weather[0].the_temp)}°C
          </p>
          <p className={styles.condition}>
            {weatherData.consolidated_weather[0].weather_state_name}
          </p>
        </div>
      )}
    </div>
  );
}
