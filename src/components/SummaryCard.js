import { data } from "autoprefixer";
import moment from "moment";

function SummaryCard({ day, isCelcius }) {
  let day_icon = `${
    process.env.REACT_APP_ICON_URL + day.weather[0]["icon"]
  }@2x.png`;

  const { temp } = day.main;
  const far = temp * 1.8 + 32;

  return (
    <li className="container p-4 flex items-center justify-center bg-gray-200 rounded-lg my-auto mr-1 h-full">
      <div className="my-auto">
        <p className="font-bold text-3xl text-pink-600 mb-2">
          {isCelcius ? Math.round(temp) : Math.round(far)}
          {isCelcius ? "°C" : "°F"}
        </p>
        <p className="text-2xl text-gray-800 tracking-widest">
          {day.weather[0].main}
          <img
            alt="weather icon"
            src={`${
              process.env.REACT_APP_ICON_URL + day.weather[0]["icon"]
            }@2x.png`}
            className="w-1/4 inline"
          />
        </p>
        <p className="text-gray-400 text-xs uppercase tracking-widest">
          {day.weather[0].description}
        </p>
        <p className="tracking-wider">
          {moment(day.dt_txt).format("YYYY-MM-DD")}
        </p>
      </div>
    </li>
  );
}

export default SummaryCard;
