
// ============================================= Imports =============================================
// ------------------------------------- General -------------------------------------
import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import axios from 'axios';
import './weather.css';
import iconCloudy from '../assets/icons/cloudy.svg';
import iconRainy from '../assets/icons/rainy.svg';
import iconSunny from '../assets/icons/sunny.svg';

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
    /* Child component used to display the weather at a precise hour. */

    const checkWeather = (weather:mapType) => {
        if(weather.rain > .5) {return iconRainy;}
        if(weather.cloud > .5) {return iconCloudy;}
        return iconSunny;
    };

    return(
        <div className="hourlyWeather">
            <p>
                {hour.substring(5,10)} <br/>
                {hour.substring(11)}
            </p>
            <img src={checkWeather({hour, temp, cloud, rain})} alt={checkWeather({hour, temp, cloud, rain})}/>
            <p>{temp} °C</p>
        </div>
    );
};

// ------------------------------------- Main component -------------------------------------
export function WeatherWidget () {
    /* Builds the widget for the weather. */
    const [averageTemp, setAverageTemp] = useState<String>();
    const [hourlyWeather, setHourlyWeather] = useState<mapType[]>([]);
    const [averageWeather, setAverageWeather] = useState<String>(iconSunny);
    const [address, setAddress] = useState<String>();
    const [resAddress, setResAddress] = useState<String>();
    const now = new Date().toJSON().substring(0,13);

    const getAverageTemp = (list:number[]) => {
        let sum: number = 0;
        list.forEach(element => {
            sum += element;
        })
        return Number(sum / list.length).toFixed(1) + " °";
    }

    const checkAPI = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const data={
            address:address
        }
        const res = await axios.post("http://localhost:8080/api/weather/post", data);

        let currentTime;

        for(let i = 0; i < res.data.hour.length ; i++){
            if(now == res.data.hour[i].substring(0,13)){
                currentTime = i;
                break;
            }
        }

        let weatherConstruction:mapType[] = [];

        for(let i = currentTime? currentTime : 0 ; i < 48; i++){
            const formWeather:mapType = {
                rain: res.data.rain[i],
                cloud: res.data.cloud[i],
                temp: res.data.temp[i],
                hour: res.data.hour[i],
            };
            weatherConstruction.push(formWeather);
        }

        setHourlyWeather(weatherConstruction);
        setResAddress(res.data.address);
        setAverageTemp(getAverageTemp(res.data.temp.slice(currentTime? currentTime : 0, currentTime? currentTime + 12 : 12)));
    }

    return(
        <section className="weatherWidget">
            <h1>Weather - Hourly conditions</h1>
            <hr/>
            <form onSubmit={checkAPI}>
                <input type="text" className="weatherLocation" onChange={e => {setAddress(e.target.value)}} placeholder="Enter an address"/>
                <input type="submit" value="Search"/>
            </form>

            <p>{resAddress}</p>
            <h2>{averageTemp}</h2>

            <div className="offsetWeather">
                <div className="setOfHourlyWeather">
                    {hourlyWeather.map((weather, index) => (
                        <HourlyWeather key={index} hour={weather.hour} temp={weather.temp} cloud={weather.cloud} rain={weather.rain}/>
                    ))}
                </div>
            </div>
        </section>
    )
};
