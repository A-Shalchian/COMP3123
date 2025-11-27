import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [city, setCity] = useState('Toronto');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(weatherRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setForecast(forecastRes.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
      setForecast(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeather(searchCity);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Weather Forecast</h1>
        <SearchBox onSearch={handleSearch} />
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}
        {error && <div className="error">{error}</div>}
        {weather && !loading && (
          <>
            <WeatherCard weather={weather} />
            {forecast && <Forecast forecast={forecast} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
