import { useState } from "react";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

/*eslint-disable react/prop-types */
const Input = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");
  // Update the query when the input changes
  const handleSearch = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  //get current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setQuery({ lat, lon });
      });
    }
  };
  return (
    <div className=" w-full flex items-center flex-row justify-center my-4">
      <div className="flex w-3/4 items-center gap-3 justify-center">
        <input
          type="text"
          placeholder="Seacrh for a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={pressEnter}
          className="p-2 rounded-md outline-none w-full capitalize shadow-md border-sky-200 text-lg text-sky-950 focus:border placeholder:lowercase "
        />
        <BiSearch
          size={25}
          color="white"
          className="cursor-pointer transition ease-in-out hover:scale-150 "
          onClick={handleSearch}
        />
        <BiCurrentLocation
          size={25}
          color="white"
          className="cursor-pointer transition ease-in-out hover:scale-150 "
          onClick={getLocation}
        />
      </div>

      <div className="flex w-1/4 items-center ml-2 gap-1 justify-center text-white">
        <button
          className="cursor-pointer font-medium text-xl md:text-2xl transition ease-in-out hover:scale-150 "
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <p className="text-2xl mx-1 font-medium">|</p>
        <button
          className="cursor-pointer transition text-xl md:text-2xl ease-in-out hover:scale-150 "
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Input;
