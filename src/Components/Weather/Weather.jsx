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
    const apiKey = "5eacecc6b507d252116f87d4b5dd4826"; // Your API key
    try {
      // Get the location ID
      const locationResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const locationData = await locationResponse.json();

      if (!locationResponse.ok) {
        throw new Error(locationData.message); // If the response is not okay, throw an error with the message from the API
      }

      // Get weather data using the location ID
      const { lat, lon } = locationData.coord; // Get the latitude and longitude from the location data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`
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
          <h2 className={styles.city}>{weatherData.timezone}</h2>
          <p className={styles.temperature}>
            {Math.round(weatherData.current.temp)}°C
          </p>
          <p className={styles.condition}>
            {weatherData.current.weather[0].description}
          </p>
          <p className={styles.humidity}>
            Humidity: {weatherData.current.humidity}%
          </p>
          <p className={styles.wind}>
            Wind Speed: {weatherData.current.wind_speed} m/s
          </p>
        </div>
      )}
    </div>
  );
}
