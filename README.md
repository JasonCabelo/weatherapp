# Weather App 🌦️

A modern, beautiful weather application built with React and Vite that allows you to search for cities and view current weather conditions along with a 5-day forecast.

## Features

- 🔍 **City Search** - Search for any city worldwide to get current weather
- 🌡️ **Current Weather** - Display temperature, humidity, wind speed, and weather conditions
- 📅 **5-Day Forecast** - View weather predictions for the next 5 days
- 🗺️ **Interactive Map** - See weather markers for nearby cities
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works beautifully on desktop and mobile devices

## Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API requests
- **Leaflet / React-Leaflet** - Interactive maps
- **OpenWeatherMap API** - Weather data provider

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   
```
bash
   npm install
   
```

3. Create a `.env` file in the root directory:
   
```
   VITE_WEATHER_API_KEY=your_openweathermap_api_key
   
```

4. Start the development server:
   
```
bash
   npm run dev
   
```

5. Open http://localhost:5173 in your browser

### Build for Production

```
bash
npm run build
```

## Project Structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── CityMap.jsx      # Interactive map component
│   │   └── WeatherCard.jsx # Weather display card
│   ├── App.jsx             # Main application component
│   ├── App.css            # Application styles
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point
├── index.html              # HTML template
├── package.json            # Dependencies
└── vite.config.js         # Vite configuration
```

## API Key

This app uses the OpenWeatherMap API. To get your free API key:

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API keys section
4. Copy your API key and add it to the `.env` file

## License

MIT
