import { BiSolidDropletHalf } from "react-icons/bi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { FaThermometerEmpty, FaWind } from "react-icons/fa";

/*eslint-disable react/prop-types */
const WeatherDetails = ({ weatherData, units }) => {
  const weatherInfo = [
    {
      name: "Sunrise",
      value: weatherData.sunrise,
      icon: <GiSunrise size={22} />,
    },
    { name: "Sunset", value: weatherData.sunset, icon: <GiSunset size={22} /> },
    {
      name: "High",
      value: `${weatherData.temp_max.toFixed()}°C`,
      icon: <MdKeyboardArrowUp size={22} />,
    },
    {
      name: "Low",
      value: `${weatherData.temp_min.toFixed()}°C`,
      icon: <MdKeyboardArrowDown size={22} />,
    },
  ];
  return (
    <div>
      <div className="w-full flex items-center justify-center gap-3 my-4 px-4">
        <p className="text-xl text-cyan-200 ">{weatherData?.details}</p>
      </div>
      <div className="w-full flex items-center justify-between gap-3 my-4">
        <img src={weatherData.icon} />
        <p className="text-3xl text-white  ">{weatherData?.temp.toFixed()}°C</p>

        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <FaThermometerEmpty size={18} color="white" />
            <p className=" text-white ">
              Real Feel :<span>{weatherData?.feels_like.toFixed()}°C</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <BiSolidDropletHalf size={18} color="white" />
            <p className=" text-white ">
              Humidity :<span>{weatherData?.humidity.toFixed()}%</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <FaWind size={18} color="white" />
            <p className=" text-white ">
              Wind :
              <span>
                {weatherData?.speed} {units === "metric" ? "km/h" : "m/s"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center md-gap-6 gap-x-6 gap-y-3 px-1">
        {weatherInfo.map((info) => (
          <div key={info.name} className="flex items-center gap-1">
            <p className="text-white ">{info.icon}</p>
            <p className=" text-white ">
              {info.name}: <span>{info.value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
