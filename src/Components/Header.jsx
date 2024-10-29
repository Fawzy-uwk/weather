/*eslint-disable react/prop-types */
const Header = ({ setQuery }) => {
  const cities = ["Cairo", "Giza", "Alexandria", "Aswan"];
  return (
    <div className="flex justify-around gap-2 md:gap-8 items-center z-[2] flex-wrap">
      {cities.map((city) => (
        <button
          key={city}
          className="px-2 py-2 rounded-md text-lg font-medium text-white hover:bg-gray-700/20"
          onClick={() => setQuery({ q: city })}
        >
          {city}
        </button>
      ))}
    </div>
  );
};

export default Header;
