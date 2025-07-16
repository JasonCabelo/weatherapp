import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="main-card">
<div className="main-icon">
  <img
    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
    alt={weather.weather[0].main}
  />
</div>

      <h2>{weather.name}</h2>
      <p className="temp">{Math.round(weather.main.temp)}°C</p>
      <p>{weather.weather[0].main}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {Math.round(weather.wind.speed)} m/s</p>
    </div>
  );
};

export default WeatherCard;
