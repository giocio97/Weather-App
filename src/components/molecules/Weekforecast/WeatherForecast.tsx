import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';
import { fetchWeatherForecast } from '../../../api';
import { getWeatherIcon } from '../../../features/WeatherIcon';
import './forecast.css';


interface DailyForecast {
  date: string;
  temperature: number;
  description: string;
}

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeatherForecast: React.FC = () => {
  const currentCity = useAppSelector((state) => state.weather.currentCity);
  const [forecastData, setForecastData] = useState<DailyForecast[]>([]);

  useEffect(() => {
    if (currentCity) {
      fetchWeatherForecast(currentCity.name)
        .then((data) => {

          const dailyForecastMap: Map<string, DailyForecast> = new Map();
          data.list.forEach((item) => {
            const date = item.dt_txt.split(' ')[0];
            const temperature = item.main.temp;
            const description = item.weather[0].description;
            if (!dailyForecastMap.has(date)) {
              dailyForecastMap.set(date, { date, temperature, description, });
            }
          });

          const dailyForecast: DailyForecast[] = Array.from(dailyForecastMap.values());
          setForecastData(dailyForecast);
        })
        .catch((error) => {
          console.error('Errore durante il recupero delle previsioni:', error);
        });
    }
  }, [currentCity]);

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (

    <div className='week'>
      {forecastData.map((forecast, index) => (
        <div key={index} className='week-card'>
          <h4 className='day'>{forecastDays[index]}</h4>

          <p className='temp'>{Math.round(forecast.temperature)} °C</p>
          {getWeatherIcon(forecast.description)}




        </div>
      ))}
    </div>

  );
};

export default WeatherForecast;