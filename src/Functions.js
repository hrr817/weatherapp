import axios from 'axios'

// ACCESS KEY FOR WEATHERSTACK API 
const ACCESS_KEY = process.env.REACT_APP_OPENWEATHER_API_ACCESS_KEY;

// For initial start, get location through geolocation-db
export const getLocationDB = async () => {
    return await axios.get('https://geolocation-db.com/json/')
    .then(res => res.data)
    .catch(e => e);
}

// Get location information through positionstack
export const getLocationPS = async(lat, lon) => {
    return await axios.get(`http://api.positionstack.com/v1/reverse?access_key=${process.env.REACT_APP_POSITION_STACK_API_ACCESS_KEY}&limit=1&query=${lat},${lon}`)
    .then(res => res.data)
    .catch(e => e);
}

// Get location coords through positionstack
export const getCoordPS = async(place) => {
    return await axios.get(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITION_STACK_API_ACCESS_KEY}&limit=1&query=${place}`)
    .then(res => res)
    .catch(e => e)
}

// Get weather data from openweather
export const getCurrentWeather = async(lat, lon, unit) => {
    return await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${ACCESS_KEY}`)
    .then(res => res)
    .catch(e => e);
}

export function convertUTCTimestamp(timestamp) {
     const date = new Date(timestamp * 1000);
     return date
}


export const toTwelveHourClock = hour => {
     const InTwelveHour = {
          13: '1',
          14: '2',
          15: '3',
          16: '4',
          17: '5',
          18: '6',
          19: '7',
          20: '8',
          21: '9',
          22: '10',
          23: '11',
          0: '12'
     };
     return hour > 12? InTwelveHour[hour] : hour;
}

// set background according to weather
export function setBackgroundAsWeather(id, time) { // id = weather id, time = day or night
    let weather;

    if(id === 800) {
        if(time === 'd'){
            weather = 'clear-day';
        } else {
            weather = 'clear-night';
        }
    }
    else if((id > 199) && (id < 233)) {
        weather = 'thunderstrom';
    }
    else if((id > 299) && (id < 322)) {
        weather = 'drizzle';
    }
    else if((id > 499) && (id < 532)) {
        weather = 'rainy';
    }
    else if((id > 599) && (id < 623)) {
        weather = 'snow';
    }
    else if((id > 699) && (id < 782)) {
        weather = 'atmosphere';
    }
    else if((id > 799) && (id < 805)) {
        weather = 'cloudy';
    } else {
        weather =  'no-weather-background';
    }

    weather && document.getElementsByTagName('body')[0].setAttribute('data-weather', weather);
}