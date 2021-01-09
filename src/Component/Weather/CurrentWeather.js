import React from 'react';
import { convertUTCTimestamp } from '../../Functions';

import { toggleUnit } from '../../state/useOptions'

import Temperature from './Temperature'
import {ReactComponent as ChangeIcon} from '../../assets/change.svg'
import {ReactComponent as LocationIcon} from '../../assets/location.svg'


const dataWeather = ({unit, location, data, dispatchForOptions}) => {

     const changeUnit = () => {
          dispatchForOptions(toggleUnit());
     }

     return (
          <div className="column">
               <div className="row space-between">
                    <div className="box center" style={{padding: '0em 0em 0.4em 1em'}}>
                         <span className="temperature"> <Temperature temp={data.temp} unit={unit} rounded/> </span>
                         <span style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}> 
                              <span className="sm desc-color"> {unit} </span>
                              <span className="change-icon"> <ChangeIcon onClick={changeUnit} /> </span>
                         </span>
                    </div>
                    <div className="box center" style={{padding: '0em 1em 0.4em 0em'}}>
                         <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].main}/>
                         <span className="capitalize"> {data.weather[0].description} </span>
                    </div>
               </div> 
               <div className="column desc card" style={{padding: '1.5em'}}>
                    <span> Feels like, it is <Temperature temp={data.feels_like} unit={unit}/> </span>
                    <span> {convertUTCTimestamp(data.dt).toDateString()}, </span>
                    <span style={{display: 'flex', alignItems: 'center', width: '100%'}}> 
                              <span> {`${location.place}, ${location.country}`} </span>
                              <span className="change-icon" style={{marginLeft: '0.5em'}}> <LocationIcon /> </span>
                    </span> <br/>
                    <div className="row space-between"> <span>Humidity</span> <span>{data.humidity}%</span> </div>
                    <div className="row space-between"> <span>Cloudiness</span> <span>{data.clouds}%</span> </div>
                    <div className="row space-between"> <span>Wind</span> <span>{data.wind_speed} metre/sec</span> </div>
               </div>
          </div>
     )
}

export default React.memo(dataWeather)
