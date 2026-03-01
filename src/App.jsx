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

  // Get weather emoji based on condition
  const getWeatherEmoji = () => {
    if (!weather) return "🌤️";
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("clear")) return "☀️";
    if (condition.includes("cloud")) return "☁️";
    if (condition.includes("rain")) return "🌧️";
    if (condition.includes("thunder")) return "⛈️";
    if (condition.includes("snow")) return "❄️";
    if (condition.includes("mist") || condition.includes("fog")) return "🌫️";
    return "🌤️";
  };

  return (
    <div className={`container ${isDark ? "dark" : ""} ${theme}`}>
      {/* Header */}
      <div className="header">
        <div className="toggle-wrapper">
          <span>{isDark ? "🌙" : "☀️"}</span>
          <label className="switch">
            <input
              type="checkbox"
              onChange={toggleDarkMode}
              checked={isDark}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Main Content - Homepage */}
      <div className="main-content">
        <div className="logo-container">
          <div className="weather-emoji">{getWeatherEmoji()}</div>
          <div className="google-logo-text">Weather</div>
        </div>

        <div className="search-container">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          
          <div className="search-buttons">
            <button className="search-btn" onClick={fetchWeather}>
              Search Weather
            </button>
          </div>
        </div>
      </div>

      {/* Weather Results */}
      {weather && (
        <div className="results-view">
          <div className="results-header">
            <h1 className="results-title">{weather.name}</h1>
            <p className="results-subtitle">{weather.sys.country}</p>
          </div>

          <div className="inline-grid">
            {/* Main Weather Card */}
            <div className="main-card">
              <div className="main-icon">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt={weather.weather[0].main}
                />
              </div>
              <h2>{weather.name}</h2>
              <p className="temp">{Math.round(weather.main.temp)}°</p>
              <p className="weather-desc">{weather.weather[0].description}</p>
              <div className="weather-details">
                <span className="detail-item">💧 {weather.main.humidity}%</span>
                <span className="detail-item">💨 {Math.round(weather.wind.speed)} m/s</span>
              </div>
            </div>

            {/* Forecast Cards */}
            <div className="forecast-section">
              <h3 className="forecast-title">5-Day Forecast</h3>
              <div className="forecast-grid">
                {forecast.map((item, index) => {
                  const date = new Date(item.dt_txt);
                  const label = index === 0
                    ? "Tomorrow"
                    : date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
                  return (
                    <div
                      key={index}
                      className="forecast-card"
                    >
                      <h4>{label}</h4>
                      <div className="forecast-icon">
                        <img
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          alt={item.weather[0].main}
                        />
                      </div>
                      <p className="forecast-temp">{Math.round(item.main.temp)}°</p>
                      <p className="forecast-details">
                        {Math.round(item.main.temp_min)}° / {Math.round(item.main.temp_max)}°
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="map-wrapper">
            <CityMap
              city={weather.name}
              lat={weather.coord.lat}
              lon={weather.coord.lon}
              weatherIcon={weather.weather[0].icon}
              isDark={isDark}
            />
          </div>
        </div>
      )}

      {forecast.length > 0 && weather && (
        <div className="legend-container">
          <p className="legend">Temperature · Humidity · Wind Speed</p>
        </div>
      )}
    </div>
  );
};

export default App;
