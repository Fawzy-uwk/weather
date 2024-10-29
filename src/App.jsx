import { FaSnowflake, FaStar } from "react-icons/fa";
import Header from "./Components/Header";
import Input from "./Components/Input";
import Tl from "./Components/TL";
import WeatherDetails from "./Components/WeatherDetails";
import Forecast from "./Components/Forecast";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./Services/WeatherService";
import { ClockLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState("metric");
  const [query, setQuery] = useState({ q: "Ashmun" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const message = query.q ? query.q : "Current Location";
    toast.info(`Getting weather data for ${message.toLocaleUpperCase()}`);

    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await getFormattedWeatherData({ ...query, units });

        setWeatherData(data);
      } catch (error) {
        toast.error(error.message);
      }
      setIsLoading(false);
    };

    toast.success(
      `Weather data for ${message.toLocaleUpperCase()} is Ready 😃 `
    );
    fetchData();
  }, [query, units]);

  //reformatting sunrise and sunset
  const timezoneOffsetSeconds = weatherData?.timezone;
  const localTimezoneOffset = new Date().getTimezoneOffset() * 420000; // in milliseconds
  const timezoneOffsetMilliseconds =
    (timezoneOffsetSeconds * 1000 || 0) - localTimezoneOffset;

  // Calculate the current time in the city's timezone
  const currentTime = new Date(Date.now() + timezoneOffsetMilliseconds);

  const sunrise = new Date(
    `${currentTime.toDateString()} ${weatherData?.sunrise}`
  );
  const sunset = new Date(
    `${currentTime.toDateString()} ${weatherData?.sunset}`
  );

  //change background depending on temp on both metric and not metric system //changing background depending on day and night

  const updateBg = () => {
    let background;

    if (currentTime > sunset || currentTime < sunrise) {
      background = "from-[#2C5364] via-[#203A43] to-[#0F2027]";
    } else {
      if (units === "metric") {
        background =
          weatherData?.temp < 25
            ? "from-[#1A2980] to-[#26D0CE]"
            : "from-[#ffa24f] to-[#fdbb2d]";
      } else if (units === "imperial") {
        background =
          weatherData?.temp < 80
            ? "from-[#1A2980] to-[#26D0CE]"
            : "from-[#ffa24f] to-[#fdbb2d]";
      } else {
        background = "from-[#1A2980] to-[#26D0CE]";
      }
    }

    return background;
  };

  return (
    <>
      <div
        className={`lg:max-w-screen-lg md:max-w-screen-md mx-2 bg-gradient-to-br rounded-md my-20 py-5 px-2  md:px-24 md:mx-auto shadow-lg z-[2] ${updateBg()} relative`}
      >
        {weatherData?.details === "Rain" && (
          <div className="rain-background">
            {Array(400)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="drop"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${1 + Math.random() * 10}s`,
                  }}
                />
              ))}
          </div>
        )}

        {(currentTime > sunset || currentTime < sunrise) && (
          <div className="absolute -z-[1] top-0 left-0 h-full w-full">
            {/* Render multiple stars */}
            {Array(150)
              .fill()
              .map((_, index) => (
                <FaStar
                  key={index}
                  style={{
                    position: "absolute",
                    top: `${Math.random() * 110}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  color="rgba(255,255,255,.8)"
                  size={5}
                  className="ice-piece"
                />
              ))}
          </div>
        )}

        {weatherData?.details === "Snow" && (
          <div className="ice-background">
            {Array(200)
              .fill()
              .map((_, index) => (
                <FaSnowflake
                  key={index}
                  className="ice-piece"
                  color="rgba(255,255,255,.8)"
                  size={10}
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${0.5 + Math.random() * 10}s`,
                  }}
                />
              ))}
          </div>
        )}

        {isLoading ? (
          <div className="w-full h-[50vh] flex items-center justify-center">
            <ClockLoader color="#b6dcec" className="w-full" size={75} />
          </div>
        ) : (
          weatherData && (
            <>
              <Header weatherData={weatherData} setQuery={setQuery} />
              <Input setQuery={setQuery} query={query} setUnits={setUnits} />
              <Tl weatherData={weatherData} />
              <WeatherDetails weatherData={weatherData} units={units} />
              <Forecast
                weatherData={weatherData?.forecastData.hourlyData}
                title={"3 Hours step Forecast"}
              />
              <Forecast
                weatherData={weatherData?.forecastData.dailyData}
                title={"Daily Forecast"}
              />
            </>
          )
        )}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          theme="colored"
        />
      </div>
    </>
  );
}

export default App;
