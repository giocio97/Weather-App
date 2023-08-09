import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';


export interface WeatherData {
  name: string;
  day: string;
  description: string;
  temperature: number;
  currentTime: string;
  currentTimeApi: number;
}


interface WeatherApiResponse {
  lat: number;
  lon: number;
  name: string;
  dt: number;
  timezone: number;
  weather: { description: string }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };


}

interface WeatherForecastApiResponse {
  city: {
    name: string;
  };
  list: {
    dt_txt: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: {
      description: string;
    }[];
  }[];
}
export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherApiResponse>(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const { name, dt, timezone, weather, main } = response.data;
    const day = new Date(dt * 1000).toLocaleDateString('en-EN', { weekday: 'long', day: 'numeric', month: 'long' });
    const description = weather[0]?.description;
    const temperature = Math.round(main?.temp);
    const currentTimeApi = dt + timezone;

    const currentTime = new Date(currentTimeApi * 1000);
    const localOffset = new Date().getTimezoneOffset() * 60 * 1000; // Calcolo dello spostamento locale
    const localTime = new Date(currentTime.getTime() - localOffset);

    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedTime = `${hours % 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    return {
      name,
      day,
      description,
      temperature,
      currentTime: formattedTime,
      currentTimeApi
    };
  } catch (error) {
    console.error('Errore durante la richiesta API:', error);
    throw error;
  }
};








export const fetchWeatherForecast = async (city: string): Promise<WeatherForecastApiResponse> => {
  const response = await axios.get<WeatherForecastApiResponse>(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};
