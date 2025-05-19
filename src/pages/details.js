import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WeatherCard from "../Component/WeatherCard";

export default function WeatherDetailsPage() {
  const router = useRouter();
  const { city } = router.query;

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (city) {
      fetchWeather(city);
      fetchForecast(city);
    }
  }, [city]);

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;


  const fetchWeather = async (cityName) => {
    setLoading(true);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    setWeather(data);
    setLoading(false);
  };

  const fetchForecast = async (cityName) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    if (data && data.list) {
      const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));
      setForecast(daily);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-[#bfdddf] p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold dark:text-black text-gray-300 mb-4">
        🌦️ Weather Details
      </h1>

      {loading ? (
        <p className="dark:text-gray-600 text-gray-300">Loading weather data...</p>
      ) : weather ? (
        <>
          <WeatherCard data={weather} />

          {/* Forecast section */}
          <h3 className="text-xl font-bold mt-8 mb-4 text-gray-300 dark:text-black">5-Day Forecast</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="bg-gray-700 dark:bg-[#70BDC2] rounded-lg p-4 shadow text-center"
              >
                <p className="font-semibold dark:text-black text-gray-300">
                  {new Date(day.dt_txt).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <p className="text-2xl font-bold dark:text-black text-gray-300">{Math.round(day.main.temp)}°C</p>
                <p className="capitalize text-gray-300 dark:text-black text-sm">{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-red-600">City not found</p>
      )}
    </div>
  );
}
