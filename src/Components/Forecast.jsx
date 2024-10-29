/*eslint-disable react/prop-types */
const Forecast = ({ weatherData, title }) => {
  return (
    <div>
      <div className="flex items-center justify-start my-4">
        <p className="text-white text-xl uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {weatherData?.map((item,index) => (
          <div
            key={index}
            className="flex items-center flex-col justify-center gap-2 flex-wrap"
          >
            <p className="text-white text-sm">{item.title}</p>
            <img src={item?.icon} className="w-20" />
            <p className="text-xl text-white  ">
              {item.temp.toFixed()}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
