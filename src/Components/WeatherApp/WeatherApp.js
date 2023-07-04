import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import './WeatherApp.css';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isMph, setIsMph] = useState(false);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const API_KEY = '4c659e2a0cd142dd9ed165233230407'; // Replace with your actual API key

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError('Error fetching weather data');
    }
  };

  const toggleUnitSystem = () => {
    setIsMph(!isMph);
  };

  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  useEffect(() => {
    if (weatherData) {
      setWeatherData((prevData) => ({
        ...prevData,
        current: {
          ...prevData.current,
          wind_kph: isMph ? Math.round(prevData.current.wind_kph / 1.60934) : prevData.current.wind_kph,
        },
        forecast: {
          ...prevData.forecast,
          forecastday: prevData.forecast.forecastday.map((day) => ({
            ...day,
            day: {
              ...day.day,
              maxtemp_c: isFahrenheit ? Math.round(day.day.maxtemp_c * 1.8 + 32) : day.day.maxtemp_c,
              mintemp_c: isFahrenheit ? Math.round(day.day.mintemp_c * 1.8 + 32) : day.day.mintemp_c,
            },
          })),
        },
      }));
    }
  }, [isMph, isFahrenheit, weatherData]);

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="unit-toggle">
        <button onClick={toggleUnitSystem}>{isMph ? 'KPH' : 'MPH'}</button>
        <button onClick={toggleTemperatureUnit}>{isFahrenheit ? 'Celsius' : 'Fahrenheit'}</button>
      </div>
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div className="weather-data">
          <h2>{weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</h2>
          <div className="current-weather">
            <h3>Current Weather</h3>
            <div className="weather-details">
              <div className="weather-icon">
                <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
              </div>
              <div className="weather-text">
                <p>{weatherData.current.condition.text}</p>
                <p>Temperature: {isFahrenheit ? weatherData.current.temp_f : weatherData.current.temp_c}°{isFahrenheit ? 'F' : 'C'}</p>
                <p>Feels Like: {isFahrenheit ? weatherData.current.feelslike_f : weatherData.current.feelslike_c}°{isFahrenheit ? 'F' : 'C'}</p>
                <p>Wind: {isMph ? weatherData.current.wind_mph : weatherData.current.wind_kph} {isMph ? 'mph' : 'kph'}</p>
              </div>
            </div>
          </div>
          <div className="forecast">
            <h3>3-day Forecast</h3>
            <div className="forecast-days">
              {weatherData.forecast.forecastday.map((day) => {
                const forecastDate = DateTime.fromISO(day.date);
                const dayOfWeek = forecastDate.setLocale('en-US').toFormat('EEEE');

                return (
                  <div className="forecast-day" key={day.date}>
                    <div className="forecast-date">{day.date}</div>
                    <div className="forecast-day-of-week">{dayOfWeek}</div>
                    <div className="forecast-icon">
                      <img src={day.day.condition.icon} alt={day.day.condition.text} />
                    </div>
                    <div className="forecast-text">
                      <p>{day.day.condition.text}</p>
                      <p>Max: {isFahrenheit ? day.day.maxtemp_f : day.day.maxtemp_c}°{isFahrenheit ? 'F' : 'C'}</p>
                      <p>Min: {isFahrenheit ? day.day.mintemp_f : day.day.mintemp_c}°{isFahrenheit ? 'F' : 'C'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
