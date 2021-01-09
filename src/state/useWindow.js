import  { useReducer } from 'react'

const initialState = {
     showTimeWeather: false,
     showDayWeather: false,
     date: null,
     data: null
}

const windowAction = {
     setTimeWeather: param => ({
          type: 'SET_TIME_Weather',
          payload: param
     }),
     setDayWeather: param => ({
          type: 'SET_DAY_Weather',
          payload: param
     }),
     setDate: param => ({
          type: 'SET_DATE',
          payload: param
     }),
     setData: param => ({
          type: 'SET_DATA',
          payload: param
     }),
     reset: () => ({
          type: 'RESET',
          payload: {...initialState}
     })
}

// Reducer Function
function reducer(state, action) {
     switch(action.type){
          case 'SET_TIME_Weather': return {...state, showTimeWeather: action.payload};
          case 'SET_DAY_Weather': return {...state, showDayWeather: action.payload};
          case 'SET_DATE': return {...state, date: action.payload};
          case 'SET_DATA': return {...state, data: action.payload};
          case 'RESET':  return initialState;
          default: return state;
     }
}

const useWindow = () => {
     const [state, dispatch] = useReducer(reducer, initialState);
     return [state, dispatch]
}

export { useWindow, windowAction }

