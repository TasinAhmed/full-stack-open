import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [capitalWeather, setCapitalWeather] = useState(null);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const selectCountry = (id) => {
    setFilteredCountries([filteredCountries[id]]);
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(({ data }) => setCountries(data));
  }, []);

  useEffect(() => {
    setCapitalWeather(null);
  }, [search]);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const [lat, lon] = filteredCountries[0].capitalInfo.latlng;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then(({ data }) => {
          console.log(data);
          setCapitalWeather(data);
        });
    }
  }, [filteredCountries]);

  return (
    <div>
      <div>
        filter shown with <input value={search} onChange={onSearchChange} />
      </div>
      {filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {filteredCountries.length > 1 &&
        filteredCountries.length <= 10 &&
        filteredCountries.map((country, index) => (
          <div key={index}>
            <span>{country.name.common}</span>
            <button onClick={() => selectCountry(index)}>show</button>
          </div>
        ))}
      {filteredCountries.length === 1 && (
        <>
          <h1>{filteredCountries[0].name.common}</h1>
          <div>capital {filteredCountries[0].capital[0]}</div>
          <div>population {filteredCountries[0].population}</div>
          <h2>Spoken languages</h2>
          <ul>
            {Object.values(filteredCountries[0].languages).map(
              (language, index) => (
                <li key={index}>{language}</li>
              )
            )}
          </ul>
          <img src={filteredCountries[0].flags.png} alt="Flag" />
          <h2>Weather in {filteredCountries[0].capital[0]}</h2>
          <div>
            <strong>temperature:</strong>{" "}
            {capitalWeather &&
              `${Math.round(capitalWeather.main.temp - 273.15)} celsius`}
          </div>
          {capitalWeather && (
            <img
              src={`http://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`}
              alt=""
            />
          )}
          <div>
            <strong>wind: </strong>{" "}
            {capitalWeather && capitalWeather.wind.speed} m/s
          </div>
        </>
      )}
    </div>
  );
};

export default App;
