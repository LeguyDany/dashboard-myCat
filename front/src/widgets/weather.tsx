
// ============================================= Imports =============================================
// ------------------------------------- General -------------------------------------
import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import './weather.css';
import iconCloudy from './assets/icons/cloudy.svg';
import iconRainy from './assets/icons/rainy.svg';
import iconSunny from './assets/icons/sunny.svg';

// ============================================= Components =============================================
// ------------------------------------- Interfaces -------------------------------------
interface mapType{
    hour:string;
    temp:number;
    cloud:number;
    rain:number;
}

// ------------------------------------- Child -------------------------------------
function HourlyWeather({hour, temp, cloud, rain}:mapType) {
    /!* Child component used to display the weather at a precise hour. *!/

    const checkWeather = (weather:mapType) => {
        if(weather.rain > .5) {return iconRainy;}
        if(weather.cloud > .5) {return iconCloudy;}
        return iconSunny;
    };

    return(
        <div className="hourlyWeather">
            <p>{hour}</p>
            <img src={checkWeather({hour, temp, cloud, rain})} alt={checkWeather({hour, temp, cloud, rain})}/>
            <p>{temp}</p>
        </div>
    );
};

// ------------------------------------- Main component -------------------------------------
export function WeatherWidget () {
    /!* Builds the widget for the weather. *!/
    const [averageTemp, setAverageTemp] = useState<number>();
    const [hourlyWeather, setHourlyWeather] = useState<mapType[]>([]);

    const getAverageTemp = (list:mapType[]) => {
        let sum = 0;
        list.forEach(element => {
            sum += element.temp;
        })
        return sum / list.length;
    }

    useEffect(() => {
        const data = async () => {

        }
        setAverageTemp(getAverageTemp(hourlyWeather));
    }, [])

    return(
        <section className="weatherWidget">
            <h1>Weather - Hourly conditions</h1>
            <hr/>
            <input type="text" className="weatherLocation"/>
            <h2>{averageTemp}</h2>
            {hourlyWeather.map(weather => (
                <HourlyWeather hour={weather.hour} temp={weather.temp} cloud={weather.cloud} rain={weather.rain}/>
            ))}
        </section>
    )
};
