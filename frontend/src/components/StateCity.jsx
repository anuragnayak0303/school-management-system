import React, { useEffect, useState } from 'react';
import { State, City } from 'country-state-city';

const StateCitySelect = ({ onStateChange, onCityChange, fromdata, setFormData }) => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    // Fetch all Indian states on component mount
    useEffect(() => {
        setStates(State.getStatesOfCountry('IN'));
    }, []);

    // Fetch cities when a state is selected
    useEffect(() => {
        if (selectedState) {
            const fetchedCities = City.getCitiesOfState('IN', selectedState);
            setCities(fetchedCities);
            onStateChange?.(selectedState);
        } else {
            setCities([]);
            onStateChange?.('');
        }
    }, [selectedState, onStateChange]);

    // Trigger city change callback
    useEffect(() => {
        onCityChange?.(selectedCity);
    }, [selectedCity, onCityChange]);

    // Handle change in state
    const handleStateChange = (e) => {
        const { name, value } = e.target; // value = isoCode
        setSelectedState(value);

        const selected = states.find(state => state.isoCode === value);
        const stateName = selected?.name || '';

        // Save state name instead of code in form data
        setFormData(prev => ({ ...prev, [name]: stateName }));
        setSelectedCity('');
    };

    // Handle change in city
    const handleCityChange = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        setFormData(prev => ({ ...prev, city }));
    };

    return (
        <div className="space-y-4">
            {/* State Dropdown */}
            <div>
                <label htmlFor="state" className="block font-medium mb-1">
                    State <span className="text-red-500">*</span>
                </label>
                <select
                    id="state"
                    name="state"
                    value={selectedState}
                    onChange={handleStateChange}
                    className="w-full border rounded p-2"
                >
                    <option value="">Please select a state</option>
                    {states.map(({ isoCode, name }) => (
                        <option key={isoCode} value={isoCode}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            {/* City Dropdown */}
            <div>
                <label htmlFor="city" className="block font-medium mb-1">
                    City <span className="text-red-500">*</span>
                </label>
                <select
                    id="city"
                    name="city"
                    value={selectedCity}
                    onChange={handleCityChange}
                    disabled={!selectedState}
                    className="w-full border rounded p-2 disabled:opacity-50"
                >
                    <option value="">Please select a city</option>
                    {cities.map(({ name }) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default StateCitySelect;
