import { useState } from "react";
import Header from "./components/Header";
import DetailCard from "./components/DetailCard";
import SummaryCard from "./components/SummaryCard";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [noData, setNoData] = useState("No Data Yet");
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("Unknown location");
  const [weatherIcon, setWeatherIcon] = useState(
    `${process.env.REACT_APP_ICON_URL}10n@2x.png`
  );

  const [isCelcius, setIsCelcius] = useState(true);

  const changeUnit = () => {
    setIsCelcius(!isCelcius);
  };

  {
    /* test convert celcius to fahrenheit */
  }

  const handleChange = (input) => {
    const { value } = input.target;
    setSearchTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(searchTerm);
  };

  const getWeather = async (location) => {
    setWeatherData([]);

    const how_to_search =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location[0]}&lon=${location[1]}`;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_URL}${how_to_search}&appid=${API_KEY}&units=metric&cnt=5`
      );

      const data = await res.json();
      if (data.cod != 200) {
        setNoData("Location Not Found");
        return;
      }
      setWeatherData(data);
      setCity(`${data.city.name}, ${data.city.country}`);
      setWeatherIcon(
        `${process.env.REACT_APP_ICON_URL}${data.list[0].weather[0]["icon"]}@4x.png`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const myIP = (location) => {
    const { latitude, longitude } = location.coords;
    getWeather([latitude, longitude]);
  };

  return (
    <div className="screenheight bg-gray-800 flex items-center justify-center h-screen py-8">
      <div className="maindiv flex w-3/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100">
        {/* form card section  */}
        <div className="form-container">
          <div className="flex items-center justify-center">
            <h3
              className="my-auto mr-auto text-xl text-pink-800 font-bold shadow-md py-1 px-3 
            rounded-md bg-white bg-opacity-30"
            >
              forecast
            </h3>
            <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg">
              <i className="fa fa-map my-auto" aria-hidden="true"></i>
              <div className="text-right">
                <p className="font-semibold text-sm ml-2">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className=" weatherapp text-white text-2xl">
              Your Super Mega Cool Weatherapp
            </h1>
            <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex justify-center w-full"
            >
              <input
                type="text"
                placeholder="Search location"
                className="relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200"
                onChange={handleChange}
              />
              <button type="submit" className="z-10">
                <i
                  className="fa fa-search text-white -ml-10 border-l my-auto z-10 hover:text-gray-600 cursor-pointer p-3"
                  aria-hidden="true"
                  type="submit"
                ></i>
              </button>
              <i
                className="mylocation fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white"
                aria-hidden="true"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(myIP);
                  console.log(myIP);
                }}
              ></i>
            </form>
          </div>
        </div>
        {/* info card section  */}
        <div className="infocard w-2/4 ml-5 mr-5">
          <Header />
          <div className="flex flex-col my-10 nodatayet">
            {/* card jsx  */}
            {weatherData.length === 0 ? (
              <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                <h1 className="nodatayet text-gray-300 text-4xl font-bold uppercase">
                  {noData}
                </h1>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    changeUnit();
                  }}
                  className="convertbutton bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-3 pt-3 rounded m-1 w-48"
                >
                  Convert to farenheit
                </button>
                <h1 className="todayh1 text-5xl text-gray-800 mt-auto mb-4">
                  Today
                </h1>
                <DetailCard
                  isCelcius={isCelcius}
                  weatherIcon={weatherIcon}
                  data={weatherData}
                />
                <h1 className="text-3xl text-gray-600 mb-4 mt-10">
                  More On {city}
                </h1>
                <ul className="grid grid-cols-2  gap-2">
                  {weatherData.list.map((days, index) => {
                    if (index > 0) {
                      return (
                        <SummaryCard
                          isCelcius={isCelcius}
                          key={index}
                          day={days}
                        />
                      );
                    }
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
