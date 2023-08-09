
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';
import { fetchWeatherForecast } from '../../../api';
import DailyForecastTimeline from './DailyForecastTimeline';


interface HourlyForecast {
  time: string;
  temperature: number;
  description: string;
}

interface DailyForecast {
  date: string;
  hourly: HourlyForecast[];
}

const HourlyForecastDay: React.FC = () => {
  const currentCity = useAppSelector((state) => state.weather.currentCity);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast | null>(null);

  useEffect(() => {
    if (currentCity) {
      fetchWeatherForecast(currentCity.name)
        .then((data) => {
          const date = new Date().toISOString().split('T')[0];
          const hourlyForecast: HourlyForecast[] = data.list
            .filter((item) => item.dt_txt.includes(date))
            .map((item) => ({
              time: item.dt_txt.split(' ')[1].substring(0, 5),
              temperature: item.main.temp,
              description: item.weather[0].description,
            }));

          setDailyForecast({ date, hourly: hourlyForecast });
        })
        .catch((error) => {
          console.error('Errore durante il recupero delle previsioni:', error);
        });
    }
  }, [currentCity]);

  return (
    <div>
      
      {dailyForecast ? <DailyForecastTimeline dailyForecast={dailyForecast} /> : <p>Caricamento...</p>}
    </div>
  );
};

export default HourlyForecastDay;
