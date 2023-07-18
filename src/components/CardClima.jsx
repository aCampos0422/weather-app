import axios from "axios"
import { useState, useEffect } from "react"
import "./style/CardClima.css"


const CardClima = () => {
  const [data, setData] = useState({});
  const [unit, setUnit] = useState("metric");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=5180f77f142492d783f21f2d379b3fbc&lang=sp&units=metric`
        )
        .then((resp) => setData(resp.data))
        .catch((error) => console.error(error));
    });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=5180f77f142492d783f21f2d379b3fbc&lang=sp&units=metric`
        )
        .then((resp) => {
          setData(resp.data);
        })
        .catch((error) => console.error(error));
    }
  }, [searchQuery, unit]);

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value.trim());
  };


  return (
    <section className="main_container">
      <div className="title">
        <h1>Weather app</h1>
      </div>

      <div className="group">
        <svg className="bar" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          placeholder="Buscar"
          type="search"
          className="input"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>

      <div className="weather_card">
        <h1 className="temperature">
          {unit === "metric"
            ? Math.round(data.main?.temp)
            : Math.round((data.main?.temp * 9) / 5 + 32)
          }
          {unit === "metric" 
            ? " °C" 
            : " °F"
          }
        </h1>

        {/* <div className="Climate_Image">
          <img src={`./icons/${data?.weather?.[0].icon}.svg`} alt={data?.weather?.[0].description} className="icon_weather" />
        </div> */}

        <div className="environmental_container">
          <p>VIENTO: {data.wind?.speed} m/s</p>
          <p>NUBES: {data.clouds?.all} %</p>
          <p>PRESIÓN: {data.main?.pressure} hPa </p>
        </div>

        <div className="bottom_row">
          <div className="city_container">
            <p>
              {data.name}, {data.sys?.country}
            </p>
          </div>

          <div className="sky_status">
            <p>{data.weather?.[0].description}</p>
          </div>
        </div>
      </div>

      <button className="units_button" onClick={toggleUnit}>
        {unit === "metric" ? "℉" : "℃" }
      </button>
    </section>
  );
};

export default CardClima;