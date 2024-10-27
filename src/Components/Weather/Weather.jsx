import { useState, useEffect } from "react";
import styles from "./Weather.module.css";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (err) => {
        setError("Unable to retrieve location");
      }
    );
  }, []);

  const fetchWeather = async (lat, lon) => {
    const apiKey = "5eacecc6b507d252116f87d4b5dd4826"; 
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <h1 className={styles.title}>Weather App</h1>

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
