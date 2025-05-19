import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("searchHistory");
      const parsed = saved ? JSON.parse(saved) : [];
      setHistory(parsed);
    } catch (e) {
      console.error("Failed to parse search history JSON:", e);
      localStorage.removeItem("searchHistory");
      setHistory([]);
    }
  }, []);

  const goToDetails = (city) => {
    router.push(`/details?city=${encodeURIComponent(city)}`);
  };

  const removeCity = (cityToRemove) => {
    const updatedHistory = history.filter(city => city !== cityToRemove);
    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="min-h-screen  bg-gray-900 dark:bg-[#bfdddf] p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-black  text-gray-300">🔍 Search History</h1>
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((city, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center dark:bg-[#70BDC2] bg-gray-700 00 p-3 rounded shadow hover:bg transition"
            >
              <span
                className="cursor-pointer dark:text-black text-gray-300"
                onClick={() => goToDetails(city)}
              >
                {city}
              </span>
              <button
                onClick={() => removeCity(city)}
                className="dark:text-black text-gray-300 dark:hover:text-gray-600 hover:text-red-600"
                title="Remove"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
