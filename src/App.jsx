import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import CityMap from "./components/CityMap";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState("day");

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = weatherRes.data;
      setWeather(data);

      const hour = new Date().getHours();
      const condition = data.weather[0].main.toLowerCase();
      if (condition.includes("rain")) {
        setTheme("rainy");
      } else if (hour >= 18 || hour < 6) {
        setTheme("night");
      } else {
        setTheme("day");
      }

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );

      const daily = forecastRes.data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(daily.slice(0, 5));
    } catch (err) {
      console.error("Fetch error:", err);
      alert("City not found");
      setWeather(null);
      setForecast([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`container ${isDark ? "dark" : ""} ${theme}`}>
      <div className="header">
        <h1 className="app-title">🌦️ Weather App</h1>
        <div className="toggle-wrapper">
          <span className="toggle-label">{isDark ? "Dark" : "Light"}</span>
          <label className="switch">
            <input
              type="checkbox"
              onChange={toggleDarkMode}
              checked={isDark}
            />
            <span className="slider">
            </span>
          </label>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {weather && (
        <>
          <div className="inline-grid">
            <WeatherCard weather={weather} />

            <div className="forecast-grid">
              {forecast.map((item, index) => {
                const date = new Date(item.dt_txt);
                const label =
                  index === 0
                    ? `Tomorrow - ${date.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}`
                    : `${date.toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}`;
                return (
                  <div
                    key={index}
                    className="forecast-card"
                    title={item.weather[0].description}
                  >
                    <h4>{label}</h4>
                    <div className="forecast-icon">
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt={item.weather[0].main}
                      />
                    </div>
                    <p className="forecast-temp">
                      {Math.round(item.main.temp)}°C
                    </p>
                    <p className="forecast-details">
                      🌡️ {Math.round(item.main.temp_min)}° /{" "}
                      {Math.round(item.main.temp_max)}°<br />
                      💧 {item.main.humidity}%<br />
                      💨 {Math.round(item.wind.speed)} m/s
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="map-wrapper">
            <CityMap
              city={weather.name}
              lat={weather.coord.lat}
              lon={weather.coord.lon}
              weatherIcon={weather.weather[0].icon}
            />
          </div>
        </>
      )}

      {forecast.length > 0 && (
        <p className="legend">
          🌡️ Temp Range 💧 Humidity 💨 Wind Speed
        </p>
      )}
    </div>
  );
};

export default App;
