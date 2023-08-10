import React from 'react';
import './DailyForecast.css'
interface HourlyForecast {
    time: string;
    temperature: number;
    description: string;
}

export interface DailyForecast {
    date: string;
    hourly: HourlyForecast[];
}

interface Props {
    dailyForecast: DailyForecast;
}

const DailyForecastTimeline: React.FC<Props> = ({ dailyForecast }) => {
    return (
        <div className="hours-timeline">

            <ul className='timeline'>
                {dailyForecast.hourly.map((hourForecast, index) => (
                    <li key={index} className='li '>
                        <div className="timestamp">
                            <span className="hours">{hourForecast.time}</span>
                        </div>
                        <div className='line'></div>
                        <div className="status">
                            <h4>{Math.round(hourForecast.temperature)} °C</h4>
                        </div>

                    </li>
                ))}
            </ul>




        </div >
    );
};

export default DailyForecastTimeline;
