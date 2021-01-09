import { useReducer } from 'react'

const initialState = {
     unit: 'Celsius'
}

const type = {
     TOGGLE_UNIT: 'TOGGLE_UNIT'
}

function reducer(state, action) {
     switch(action.type) {
          case type.TOGGLE_UNIT: return { unit: state.unit === 'Celsius'? 'Fahrenheit' : 'Celsius' };
          default: return state;
     }
}

const useOptions = () => {

     const [state, dispatch] = useReducer(reducer, initialState)

     return [state, dispatch];
}


const toggleUnit = () => ({ type: type.TOGGLE_UNIT });

export { useOptions, toggleUnit}
