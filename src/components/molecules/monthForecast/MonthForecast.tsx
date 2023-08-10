import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';
import { fetchWeatherForecast } from '../../../api';
import { getWeatherIcon } from '../../../features/WeatherIcon';
import './monthforecast.css';



interface WeatherData {
    dt_txt: string;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
    weather: {
        description: string;
    }[];
}



const WeatherMonthForecast: React.FC = () => {
    const currentCity = useAppSelector((state) => state.weather.currentCity);
    const [forecastData, setForecastData] = useState<WeatherData[]>([]);

    useEffect(() => {
        if (currentCity) {
            fetchWeatherForecast(currentCity.name)
                .then((data) => {

                    const dailyForecastMap: Map<string, WeatherData> = new Map();
                    data.list.forEach((item) => {
                        const date = item.dt_txt.split(' ')[0];
                        if (!dailyForecastMap.has(date)) {
                            dailyForecastMap.set(date, item);
                        }
                    });


                    const dailyForecasts: WeatherData[] = Array.from(dailyForecastMap.values());
                    setForecastData(dailyForecasts);
                })
                .catch((error) => {
                    console.error('Error while fetching weather forecast:', error);
                });
        }
    }, [currentCity]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.toLocaleString('en-EN', { weekday: 'short' });
        const month = date.toLocaleString('en-EN', { month: 'short' });
        return `${day}, ${date.getDate()} ${month}`;
    };

    return (
        <div className='month-container'>
            <div className='month' >
                {forecastData.map((forecast, index) => (
                    <div key={index} className='weather-card-month'>
                        <div>
                            <h2 className='day'>{formatDate(forecast.dt_txt)}</h2>
                            {getWeatherIcon(forecast.weather[0]?.description)}

                        </div>
                        <div>
                            <p className='temp'>{Math.round(forecast.main.temp)} °C</p>
                            <p className='description'>{forecast.weather[0]?.description}</p>
                            <p className='temp-range'> The high will be {Math.round(forecast.main.temp_max)} °C, the low will be
                                {Math.round(forecast.main.temp_min)} °C.
                            </p>
                            <p className='humidity'>Humidity: {forecast.main.humidity}%</p>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherMonthForecast;