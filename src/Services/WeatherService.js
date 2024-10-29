import { DateTime } from "luxon";
const API_Key = "25bfae034a47d2de3462e4b206c92518";
const API_Base_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (type, params) => {
  const url = new URL(API_Base_URL + type);
  // Convert the params object to an array of arrays
  const searchParams = new URLSearchParams(
    Object.entries({ ...params, appid: API_Key })
  );
  url.search = searchParams;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data);
};

const iconUrl = (icon) => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

const formatToLocalTime = (
  secs,
  offset,
  format = "ccc, dd LLL yyyy' | Local Time: 'hh:mm a"
) => {
  // Convert Unix timestamp to milliseconds and add the timezone offset
  const dateTime = DateTime.fromSeconds(secs + offset, {
    zone: "utc",
  });

  // Format the date and time
  return dateTime.toFormat(format);
};

//format data
const formatCurrent = (data) => {
  
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity }, // Corrected property name
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0]; // Corrected array access
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`; // Define iconUrl
  const formattedLocalTime = formatToLocalTime(dt, timezone); // Assuming formatToLocalTime is defined

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_max,
    temp_min,
    details,
    humidity, // Corrected property name
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"), // Corrected format string
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"), // Corrected format string
    weatherDescription: details,
    icon: iconUrl,
    speed,
    name,
    country,
    formattedLocalTime,
    dt,
    timezone,
  };
};

const formatForecastWeather = (secs, offset, data) => {
  //hourly
  const hourlyData = data
    .filter((item) => item.dt > secs)
    .slice(0, 5)
    .map((item) => ({
      temp: item.main.temp,
      title: formatToLocalTime(item.dt, offset, "hh:mm a"),
      icon: iconUrl(item.weather[0].icon),
      date: item.dt_txt,
    }));

  //daily
  const dailyData = data
    .filter((item) => item.dt > secs)
    .slice(0, 7)
    .map((item) => ({
      temp: item.main.temp,
      title: formatToLocalTime(item.dt, offset, "ccc"),
      icon: iconUrl(item.weather[0].icon),
      date: item.dt_txt,
    }));

  return { hourlyData, dailyData };
};

export const getFormattedWeatherData = async (params) => {
  const formattedCurrentWeather = await getWeatherData("weather", params).then(
    formatCurrent
  );

  //forecast
  const { dt, timezone, lat, lon } = formattedCurrentWeather;

  const forecastData = await getWeatherData("forecast", {
    lat,
    lon,

    units: params.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list));
  return { ...formattedCurrentWeather, forecastData };
};
