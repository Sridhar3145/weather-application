import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureLow } from "react-icons/fa";

// Emoji weather icon logic
const getWeatherIcon = (description) => {
  if (!description) return "🌈";
  const desc = description.toLowerCase();
  if (desc.includes("cloud")) return "☁️";
  if (desc.includes("rain")) return "🌧️";
  if (desc.includes("clear")) return "☀️";
  if (desc.includes("snow")) return "❄️";
  if (desc.includes("thunder")) return "🌩️";
  if (desc.includes("fog")) return "🌫️";
  return "🌈";
};

export default function WeatherCard({ data }) {
  if (!data || !data.main || !data.weather || data.weather.length === 0) {
    return <p>No weather data available.</p>;
  }

  const weatherIcon = getWeatherIcon(data.weather[0].description);
  const description = data.weather[0].description;

  return (
    <div className="dark:bg-[#70BDC2] bg-gray-700 dark:text-black rounded-xl p-6 w-full max-w-md shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-2 dark:text-gray-900 text-gray-300 ">{data.name}</h2>

      {/* Icon + Temp */}
      <div className="flex items-center justify-center text-5xl font-bold mb-2 gap-3 ">
        <span>{weatherIcon}</span>
        <span className="text-gray-300 dark:text-gray-900">{Math.round(data.main.temp)}°C</span>
      </div>

      {/* Weather Description */}
      <p className="text-center capitalize mb-6 dark:text-gray-900 text-gray-300">{description}</p>

      {/* Extra Info */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-300 dark:text-gray-900">
        <div className="flex flex-col items-center">
          <FaTemperatureLow className="text-orange-600 text-xl mb-1" />
          <span>Feels like</span>
          <span className="font-semibold">{Math.round(data.main.feels_like)}°C</span>
        </div>
        <div className="flex flex-col items-center">
          <WiHumidity className="text-blue-600 text-2xl mb-1" />
          <span>Humidity</span>
          <span className="font-semibold">{data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center">
          <FaWind className="text-teal-600 text-lg mb-1" />
          <span>Wind</span>
          <span className="font-semibold">{data.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}
