import clear from "../assets/lottie/clear.json";
import clouds from "../assets/lottie/clouds.json";
import rain from "../assets/lottie/rain.json";
import snow from "../assets/lottie/snow.json";
import thunderstorm from "../assets/lottie/thunderstorm.json";

const getWeatherAnimation = (type) => {
  const weather = type.toLowerCase();

  if (weather.includes("cloud")) return clouds;
  if (weather.includes("rain")) return rain;
  if (weather.includes("snow")) return snow;
  if (weather.includes("thunder")) return thunderstorm;
  if (weather.includes("clear") || weather.includes("sun")) return clear;

  return clear;
};

export default getWeatherAnimation;
