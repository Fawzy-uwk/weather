/*eslint-disable react/prop-types */
const Tl = ({ weatherData }) => {
  return (
    <>
      <div className="w-full flex items-center justify-center gap-3 my-4">
        <p className="text-xl text-white font-light">
          {weatherData?.formattedLocalTime}
        </p>
      </div>

      <div className="w-full flex items-center justify-center gap-3 my-4">
        <p className="text-2xl text-white font-bold">{`${weatherData.name},  ${weatherData.country}`}</p>
      </div>
    </>
  );
};

export default Tl;
