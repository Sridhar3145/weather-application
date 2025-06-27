import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };

    fetchHistory();
  }, []);

  const goToDetails = (city) => {
    router.push(`/details?city=${encodeURIComponent(city)}`);
  };

  const removeCity = async (id) => {
    try {
      await fetch("/api/history", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-[#bfdddf] p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-black text-gray-300">
        🔍 Search History
      </h1>
      {history.length === 0 ? (
        <p className="dark:text-black text-gray-300">No history found.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((entry) => (
            <li
              key={entry._id}
              className="flex justify-between items-center dark:bg-[#70BDC2] bg-gray-700 p-3 rounded shadow"
            >
              <span
                className="cursor-pointer dark:text-black text-gray-300"
                onClick={() => goToDetails(entry.city)}
              >
                {entry.city}
              </span>
              <button
                onClick={() => removeCity(entry._id)}
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
