import React, { useState, useEffect, useRef } from "react";
import { City } from "country-state-city";

export default function CitySelect({ UserData, setuserdat }) {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState(UserData.city || "");
  const [showList, setShowList] = useState(false);
  const ref = useRef();

  // Fetch cities on countryCode or stateCode change
  useEffect(() => {
    if (UserData.countryCode && UserData.stateCode) {
      const fetchedCities = City.getCitiesOfState(
        UserData.countryCode,
        UserData.stateCode
      );
      setCities(fetchedCities);
    } else {
      setCities([]);
    }
  }, [UserData.countryCode, UserData.stateCode]);

  // Sync input with UserData.city
  useEffect(() => {
    setSearch(UserData.city || "");
  }, [UserData.city]);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCities = cities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (city) => {
    setuserdat({
      ...UserData,
      city: city.name,
    });
    setSearch(city.name);
    setShowList(false);
  };

  return (
    <div className="relative" ref={ref}>
      <input
        type="text"
        placeholder="Select city"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowList(true);
        }}
        onFocus={() => setShowList(true)}
        className="w-full border rounded px-3 py-2 text-sm border-gray-300 outline-none focus:ring-1 focus:ring-blue-400"
      />
      {showList && filteredCities.length > 0 && (
        <ul className="absolute z-10 bg-white max-h-40 overflow-y-auto border border-gray-300 w-full mt-1 rounded shadow">
          {filteredCities.map((city, idx) => (
            <li
              key={idx}
              className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelect(city)}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
