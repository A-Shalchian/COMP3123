import React from 'react';
import './WeatherCard.css';

function WeatherCard({ weather }) {
  const date = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dateNum = date.getDate();
  const year = date.getFullYear();

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div className="weather-info">
          <h2 className="day-name">{dayName}</h2>
          <p className="date">{monthName} {dateNum}, {year}</p>
          <p className="location">{weather.name}, {weather.sys.country}</p>
          <img src={iconUrl} alt={weather.weather[0].description} className="weather-icon" />
          <h1 className="temperature">{Math.round(weather.main.temp)}°C</h1>
          <p className="description">{weather.weather[0].description}</p>
        </div>
        <div className="weather-details">
          <div className="detail-item">
            <span className="label">Feels Like</span>
            <span className="value">{Math.round(weather.main.feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span className="label">Humidity</span>
            <span className="value">{weather.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="label">Wind</span>
            <span className="value">{weather.wind.speed} m/s</span>
          </div>
          <div className="detail-item">
            <span className="label">Pressure</span>
            <span className="value">{weather.main.pressure} hPa</span>
          </div>
          <div className="detail-item">
            <span className="label">Max Temp</span>
            <span className="value">{Math.round(weather.main.temp_max)}°C</span>
          </div>
          <div className="detail-item">
            <span className="label">Min Temp</span>
            <span className="value">{Math.round(weather.main.temp_min)}°C</span>
          </div>
          <div className="detail-item">
            <span className="label">Visibility</span>
            <span className="value">{(weather.visibility / 1000).toFixed(1)} km</span>
          </div>
          <div className="detail-item">
            <span className="label">Sunrise</span>
            <span className="value">{sunrise}</span>
          </div>
          <div className="detail-item">
            <span className="label">Sunset</span>
            <span className="value">{sunset}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
