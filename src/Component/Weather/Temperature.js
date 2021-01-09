import React, { useEffect, useState } from 'react'

const convertToFahrenheit = (val) => {
     return val * (9/5) + 32;
};

const Temperature = ({temp, unit, rounded}) => {
     const [temperature, setTemperature] = useState(rounded? Math.round(temp) : temp)

     useEffect(() => {
          if(unit === 'Fahrenheit') {
               setTemperature(rounded? Math.round(convertToFahrenheit(temp)) : parseFloat(convertToFahrenheit(temp)).toFixed(2) );
          } else setTemperature(rounded? Math.round(temp) : temp)
     }, [unit, temp, rounded])

     return temperature + '°';
}

export default React.memo(Temperature)
