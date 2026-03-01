import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const CityMap = ({ city, lat, lon, weatherIcon, isDark }) => {
  const [nearbyCities, setNearbyCities] = useState([]);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // Fetch nearby cities' weather
  useEffect(() => {
    if (!lat || !lon) return;

    const fetchNearby = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=10&units=metric&appid=${apiKey}`
        );
        setNearbyCities(res.data.list);
      } catch (err) {
        console.error("Error fetching nearby cities:", err);
      }
    };

    fetchNearby();
  }, [apiKey, lat, lon, isDark]);

  const createIcon = (iconCode, label) =>
    L.divIcon({
      html: `
        <div class="custom-map-icon">
          <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" />
          <span class="city-label">${label}</span>
        </div>
      `,
      className: "weather-icon-wrapper",
      iconSize: [100, 60],
      iconAnchor: [50, 50],
    });

  // Use CartoDB tiles for both light and dark modes
  const tileUrl = isDark 
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={8}
      scrollWheelZoom={false}
      className="leaflet-container"
      key={`${lat}-${lon}`}
    >
      <TileLayer
        url={tileUrl}
        maxZoom={19}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {/* Main city marker */}
      <Marker
        position={[lat, lon]}
        icon={createIcon(weatherIcon, city)}
      ></Marker>

      {/* Nearby cities with weather */}
      {nearbyCities.map((item, i) => (
        <Marker
          key={i}
          position={[item.coord.lat, item.coord.lon]}
          icon={createIcon(item.weather[0].icon, item.name)}
        />
      ))}
    </MapContainer>
  );
};

export default CityMap;
