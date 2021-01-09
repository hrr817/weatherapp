import { useReducer } from 'react'

const initialState = {
     locations: false,
     locationData: null,
     weatherData: null
}

const type = {
     setLocations: 'SET_LOCATIONS',
     toggleLocations: 'TOGGLE_LOCATIONS',
     setLocationData: 'SET_LOCATION_DATA',
     setWeatherData: 'SET_WEATHER_DATA'
}

const action = {
     setLocations: param => ({
          type: type.setLocations,
          payload: param
     }),
     toggleLocations: () => ({
          type: type.toggleLocations
     }),
     setLocationData: param => ({
          type: type.setLocationData,
          payload: param
     }),
     setWeatherData: param => ({
          type: type.setWeatherData,
          payload: param
     })
}

function reducer(state, action) {
     switch(action.type) {
          case type.setLocations: return { ...state, locations: action.payload };
          case type.toggleLocations: return { ...state, locations: !state.locations };
          case type.setLocationData: return { ...state, locationData: action.payload };
          case type.setWeatherData: return { ...state, weatherData: action.payload };
          default: return state;
     }
}

const useData = () => {
     const [state, dispatch] = useReducer(reducer, initialState);
     return [state, dispatch];
}

export { useData, action }
