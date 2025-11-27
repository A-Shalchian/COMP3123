import './Forecast.css';

function Forecast({ forecast }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const dailyForecasts = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  return (
    <div className="forecast">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-items">
        {dailyForecasts.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const dayName = days[date.getDay()];
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

          return (
            <div key={index} className="forecast-item">
              <p className="forecast-day">{dayName}</p>
              <img src={iconUrl} alt={item.weather[0].description} />
              <p className="forecast-temp">{Math.round(item.main.temp)}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
