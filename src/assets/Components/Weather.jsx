import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Weather = () => {


    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');


    const [weatherApp, setWeatherApp] = useState({})

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude)
        })
    }, [])



    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f7caafd4aea21631da1833740cf20e8c`).then(res => setWeatherApp(res.data))
    }, [])

    const centigrades = Math.round(((weatherApp.main?.temp) - 273.15) * 100) / 100
    const farenheit = Math.round(((centigrades * 9 / 5) + 32) * 100) / 100
    const hectoPascals = weatherApp.main?.pressure
    const mmHg = Math.round((hectoPascals * 0.75) * 100) / 100
    console.log(weatherApp);

    const [isCentigrades, setIsCentigrades] = useState(true)
    const changeDegrees = () => {
        setIsCentigrades(!isCentigrades)
    }
    const [isHectoPascals, setIsHectoPascals] = useState(true)
    const changePressure = () => {
        setIsHectoPascals(!isHectoPascals)
    }
    // const weatherDescription = weatherApp?.weather[0].description

    // const weatherMain = weatherApp?.weather[0].main
    const backgroundStyle = () => {
        if (weatherMain === 'Haze'){
            return 'blue'
        }
        
        // switch(weatherMain) {
        //     case "Mist":   return "blue";
        //     case "Smoke":   return "red";
        //     case "Haze": return "orange";
        //     case "Dust":  return "yellow";
        //     case "Rain":   return "purple";
        //     case "Drizzle": return "navy";
        //     case "Thunderstorm":  return "pink";
        //     case "Snow": return "white";
        //     case "Clear":  return "gray";

        //     default:      return "transparent"
        // }
      }

    // document.body.style = `background-color: ${backgroundStyle}`

    return (
        <div className='main-container'>
            <h1>Your current weather</h1>
            <h2>{weatherApp?.name}{', '}{weatherApp.sys?.country}</h2>
            <ul className='list'>
                <li>Temp: {isCentigrades ? centigrades : farenheit} {isCentigrades ? '°C' : '°F'}</li>
                {/* <li> Weather: {weatherApp?.weather[0].description}</li> */}
                <li>Wind speed: {weatherApp?.wind?.speed} m/s</li>
                <li>Clouds: {weatherApp?.clouds?.all}% </li>
                <li>Humidity: {weatherApp.main?.humidity} %</li>
                <li>Pressure: {isHectoPascals ? hectoPascals : mmHg} {isHectoPascals ? 'hPa' : 'mmHg'}</li>
            </ul>
            <div className='btn-container'>
                <button className='btn-change' onClick={changeDegrees}> Degrees °F / °C</button>
                <button className='btn-change' onClick={changePressure}>Pressure hPa / mmHg</button></div>

        </div>
    );
};

export default Weather;