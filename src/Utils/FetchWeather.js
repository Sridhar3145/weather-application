
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;


// Fetch current weather by city name
export const fetchWeatherByCity = async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching weather by city:", err);
    return null;
  }
};

// Fetch current weather by coordinates
export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching weather by coordinates:", err);
    return null;
  }
};

//  Fetch 5-day / 3-hour forecast by city name
export const fetchForecastByCity = async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching forecast:", err);
    return null;
  }
};
