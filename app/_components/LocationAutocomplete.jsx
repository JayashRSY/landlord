import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";

const LocationAutocomplete = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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
  };

  const handleSuggestionSelect = (address) => {
    setSearchText(address);
    setSuggestions([]);
  };

  return (
    <div className="flex gap-2 items-center w-full">
      <MapPin className="h-10 w-10 p-2 rounded-full text-primary bg-purple-200"/>
      <input
        type="text"
        placeholder="Enter an address"
        value={searchText}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionSelect(suggestion.display_name)}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
