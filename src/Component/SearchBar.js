import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input) {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter city"
        className="border  px-3 py-2 rounded w-full dark:text-black text-white "
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="dark:bg-[#70BDC2] bg-gray-700 dark:text-black text-gray-300  px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}
