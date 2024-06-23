import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";

const LocationAutocomplete = (props) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);
  const api_key = "pk.84defb7e7d3805ecb85c38a7af7b0822";

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchText.trim() !== "") {
        try {
          const response = await axios.get(
            `https://us1.locationiq.com/v1/search.php?key=${api_key}&q=${searchText}&format=json&limit=5`
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchText]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    props.setAddress(null);
  };

  const handleSuggestionSelect = (address) => {
    setSearchText(address.display_name);
    props.setAddress(address);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center w-full">
      <MapPin className="h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200" />
      <div className="relative w-full" ref={dropdownRef}>
        <input
          className="h-10 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          placeholder="Enter an address"
          value={searchText}
          onChange={handleInputChange}
        />
        {!props.address && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                <div className="text-gray-800 whitespace-normal">
                  {suggestion.display_name}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LocationAutocomplete;
