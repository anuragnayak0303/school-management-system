import React, { useState, useRef, useEffect } from "react";
import { Country } from "country-state-city";

export default function CountrySelect({ UserData, setuserdat }) {
  const [search, setSearch] = useState(UserData.country || "");
  const [showList, setShowList] = useState(false);
  const dropdownRef = useRef(null);

  const countries = Country.getAllCountries();

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👇 Sync input with external changes
  useEffect(() => {
    setSearch(UserData.country || "");
  }, [UserData.country]);

  const handleSelect = (country) => {
    setuserdat({
      ...UserData,
      country: country.name,
      countryCode: country.isoCode,
      state: "",
      stateCode: "",
      city: "",
    });
    setSearch(country.name);
    setShowList(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        autoComplete="off"
        placeholder="Select country"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowList(true);
        }}
        onFocus={() => setShowList(true)}
        className="w-full border rounded px-3 py-2 text-sm border-gray-300 outline-none focus:ring-1 focus:ring-blue-400"
      />

      {showList && (
        <ul className="absolute z-10 bg-white max-h-40 overflow-y-auto border border-gray-300 w-full mt-1 rounded shadow">
          {filteredCountries.length === 0 && (
            <li className="px-4 py-2 text-sm text-gray-500">No match found</li>
          )}
          {filteredCountries.map((country) => (
            <li
              key={country.isoCode}
              className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelect(country)}
            >
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
