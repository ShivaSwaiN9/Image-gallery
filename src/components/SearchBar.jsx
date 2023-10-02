import React, { useState } from "react";
import { BiX, BiSearch } from "react-icons/bi";

const SearchBar = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery("");
    onClear(); // Call the onClear function to load local images
  };

  return (
    <div className="flex items-center w-full mb-4">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search images..."
          className="w-full p-3 pl-12 pr-10 border border-gray-300 rounded-full"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <BiSearch className="absolute left-3 top-3 text-gray-500 text-2xl"  />
        {query && (
          <button
            className="absolute right-2  top-2 text-gray-500 hover:text-gray-800 transition-colors"
            onClick={handleClear}
          >
            <BiX className="text-3xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
