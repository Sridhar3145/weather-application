import { useState, useEffect } from "react";
import SearchBar from "../Component/SearchBar";
import WeatherCard from "../Component/WeatherCard";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
} from "../Utils/FetchWeather";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setError(null);
    const data = await fetchWeatherByCity(city);

    if (data && data.main) {
      setWeather(data);
      saveToMongoHistory(city);
    } else {
      setWeather(null);
      setError("No weather data available for that city.");
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherByCoords(latitude, longitude);
          setWeather(data);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError("Location not available. Please search manually.");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  const saveToMongoHistory = async (city) => {
    try {
      await fetch("/api/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
      });
    } catch (error) {
      console.error("Failed to save to MongoDB:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 dark:bg-[#bfdddf]">
      <h1 className="text-3xl font-bold text-gray-300 mb-6 dark:text-black">
        🌤️ Weather App
      </h1>

      <SearchBar onSearch={fetchWeather} />

      {error && <p className="text-red-600 my-4">{error}</p>}

      {weather ? (
        <WeatherCard data={weather} />
      ) : !error ? (
        <p className="text-white dark:text-black mt-4">
          Search for a city or allow location access.
        </p>
      ) : null}
    </div>
  );
}
