import React, { useState, useEffect, useRef } from "react";
import { State } from "country-state-city";

export default function StateField({ UserData, setuserdat }) {
  const [states, setStates] = useState([]);
  const [search, setSearch] = useState(UserData.state || "");
  const [showList, setShowList] = useState(false);
  const ref = useRef();

  // Fetch states based on country
  useEffect(() => {
    if (UserData.countryCode) {
      const fetchedStates = State.getStatesOfCountry(UserData.countryCode);
      setStates(fetchedStates);
    } else {
      setStates([]);
    }
  }, [UserData.countryCode]);

  // Sync local search with UserData.state
  useEffect(() => {
    setSearch(UserData.state || "");
  }, [UserData.state]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredStates = states.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (state) => {
    setuserdat({
      ...UserData,
      state: state.name,
      stateCode: state.isoCode,
      city: "", // Clear city on state change
    });
    setSearch(state.name);
    setShowList(false);
  };

  return (
    <div className="relative" ref={ref}>
      <input
        type="text"
        placeholder="Select state"
        autoComplete="off"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowList(true);
        }}
        onFocus={() => setShowList(true)}
        className="w-full border rounded px-3 py-2 text-sm border-gray-300 outline-none focus:ring-1 focus:ring-blue-400"
      />
      {showList && filteredStates.length > 0 && (
        <ul className="absolute z-10 bg-white max-h-40 overflow-y-auto border border-gray-300 w-full mt-1 rounded shadow">
          {filteredStates.map((state) => (
            <li
              key={state.isoCode}
              className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelect(state)}
            >
              {state.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
