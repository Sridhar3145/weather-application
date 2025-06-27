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

  // 🔁 Weather search by city
  const fetchWeather = async (city) => {
    setError(null); // reset error
    const data = await fetchWeatherByCity(city);

    if (data && data.main) {
      setWeather(data);
      saveToLocalHistory(city); // 👉 for localStorage
      saveToMongoHistory(city); // 👉 for MongoDB
    } else {
      setWeather(null);
      setError("No weather data available for that city.");
    }
  };

  // 📍 Geolocation fetch on mount
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

  // 💾 Save to localStorage (for UI)
  const saveToLocalHistory = (city) => {
    let history = [];
    try {
      const saved = localStorage.getItem("searchHistory");
      history = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse local history:", e);
      localStorage.removeItem("searchHistory");
      history = [];
    }

    const normalizedCity = city.trim().toLowerCase();
    const normalizedHistory = history.map((c) => c.trim().toLowerCase());

    if (!normalizedHistory.includes(normalizedCity)) {
      history.push(city.trim());
      localStorage.setItem("searchHistory", JSON.stringify(history));
    }
  };

  // 🧠 Save to MongoDB
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
