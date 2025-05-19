
import { useState, useEffect } from "react";
import SearchBar from "../Component/SearchBar";
import WeatherCard from "../Component/WeatherCard";

import { fetchWeatherByCity, fetchWeatherByCoords } from "../Utils/FetchWeather";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Search input
  const fetchWeather = async (city) => {
    setError(null); // clear previous errors
    const data = await fetchWeatherByCity(city);

    if (data && data.main) {
      setWeather(data);
      saveToHistory(city);
    } else {
      setWeather(null);
      setError("No weather data available for that city.");
    }
  };

  // Geolocation on mount
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
        },
        {
          enableHighAccuracy: true, // ✅ This improves location accuracy
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  // Save to localStorage history with normalization and safe parsing
  const saveToHistory = (city) => {
    let history = [];
    try {
      const saved = localStorage.getItem("searchHistory");
      history = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse search history JSON:", e);
      localStorage.removeItem("searchHistory");
      history = [];
    }

    // Normalize city names (lowercase & trimmed) to avoid duplicates
    const normalizedCity = city.trim().toLowerCase();
    const normalizedHistory = history.map(c => c.trim().toLowerCase());

    if (!normalizedHistory.includes(normalizedCity)) {
      history.push(city.trim()); // save trimmed city name
      localStorage.setItem("searchHistory", JSON.stringify(history));
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 dark:bg-[#bfdddf]">
      <h1 className="text-3xl font-bold text-gray-300 mb-6 dark:text-black">🌤️ Weather App</h1>
      <SearchBar onSearch={fetchWeather} />
      {error && <p className="text-red-600 my-4">{error}</p>}
      {weather ? (
        <WeatherCard data={weather} />
      ) : !error ? (
        <p className="text-white dark:text-black mt-4">Search for a city or allow location access.</p>
      ) : null}
    </div>
  );
}
