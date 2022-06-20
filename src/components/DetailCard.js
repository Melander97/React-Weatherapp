import moment from "moment";

function DetailCard({ weatherIcon, data, isCelcius }) {
  const { clouds, main, weather } = data.list[0];

  const temp = main.temp;
  const far = temp * 1.8 + 32;

  return (
    <div className="container p-4 flex items-center justify-center shadow-lg rounded-lg bg-white h-1/3 mb-auto">
      <div className="my-auto">
        <p className="font-bold text-5xl text-pink-800 mb-2">
          {isCelcius ? Math.round(temp) : Math.round(far)}
          {isCelcius ? "°C" : "°F"}
        </p>
        <p className="main-img text-4xl text-gray-800 tracking-widest">
          {weather[0].main}
          <img alt="weather icon" className="w-1/4 inline" src={weatherIcon} />
        </p>
        <p className="text-gray-400 text-xs uppercase tracking-widest">
          {weather[0].description}
        </p>
        <p className="tracking-wider">{moment().format("dddd MMM YYYY")}</p>
      </div>
      <div className="my-2 border-l-2 border-gray-100 p-2">
        <p className="text-gray-400 text-lg">
          RealFeel: {Math.round(main.feels_like)}&deg;C
        </p>
        <p className="text-gray-400 text-lg">Humidity: {main.humidity}%</p>
        <p className="text-gray-400 text-lg">Cloud Cover: {clouds.all}%</p>
        <p className="text-gray-400 text-lg">
          Min Temp: {Math.round(main.temp_min)}&deg;C
        </p>
        <p className="text-gray-400 text-lg">
          Max Temp: {Math.round(main.temp_max)}&deg;C
        </p>
      </div>
    </div>
  );
}

export default DetailCard;
