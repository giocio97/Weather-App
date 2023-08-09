export const getWeatherIcon = (description: string) => {
    switch (description) {
      case 'clear sky':
        return <img alt='sky' className="weather-icon" src='https://openweathermap.org/img/wn/01d@2x.png' />;

      case 'few clouds':
        return <img alt='clouds'className="weather-icon" src='https://openweathermap.org/img/wn/02d@2x.png' />;

      case 'scattered clouds':
        return <img alt='clouds'className="weather-icon" src='https://openweathermap.org/img/wn/03d@2x.png' />;

      case 'broken clouds':
        return <img alt='clouds'className="weather-icon" src='https://openweathermap.org/img/wn/04d@2x.png' />;

        case 'overcast clouds':
        return <img alt='clouds'className="weather-icon" src='https://openweathermap.org/img/wn/04d@2x.png' />;

      case 'shower rain':
        return <img alt='rain'className="weather-icon" src='https://openweathermap.org/img/wn/09d@2x.png' />;

      case 'light rain':
        return <img alt='rain'className="weather-icon" src='https://openweathermap.org/img/wn/10d@2x.png' />;

        case 'moderate rain':
          return <img alt='rain'className="weather-icon" src='https://openweathermap.org/img/wn/10d@2x.png' />;
          
          case 'drizzle rain':
          return <img alt='rain'className="weather-icon" src='https://openweathermap.org/img/wn/09d@2x.png' />;

      case 'thunderstorm':
        return <img alt='thunderstorm'className="weather-icon" src='https://openweathermap.org/img/wn/11d@2x.png' />;

      case 'snow':
        return <img alt='snow'className="weather-icon" src='https://openweathermap.org/img/wn/13d@2x.png' />;

      case 'mist':
        return <img alt='mist'className="weather-icon" src='https://openweathermap.org/img/wn/50d@2x.png' />;
        case 'fog':
        return <img alt='fog'className="weather-icon" src='https://openweathermap.org/img/wn/50d@2x.png' />;
      default:
        return null;
    }
  };