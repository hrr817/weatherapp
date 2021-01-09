"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windowAction = exports.useWindow = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  showTimeWeather: false,
  showDayWeather: false,
  date: null,
  data: null
};
var windowAction = {
  setTimeWeather: function setTimeWeather(param) {
    return {
      type: 'SET_TIME_Weather',
      payload: param
    };
  },
  setDayWeather: function setDayWeather(param) {
    return {
      type: 'SET_DAY_Weather',
      payload: param
    };
  },
  setDate: function setDate(param) {
    return {
      type: 'SET_DATE',
      payload: param
    };
  },
  setData: function setData(param) {
    return {
      type: 'SET_DATA',
      payload: param
    };
  },
  reset: function reset() {
    return {
      type: 'RESET',
      payload: _objectSpread({}, initialState)
    };
  }
}; // Reducer Function

exports.windowAction = windowAction;

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TIME_Weather':
      return _objectSpread({}, state, {
        showTimeWeather: action.payload
      });

    case 'SET_DAY_Weather':
      return _objectSpread({}, state, {
        showDayWeather: action.payload
      });

    case 'SET_DATE':
      return _objectSpread({}, state, {
        date: action.payload
      });

    case 'SET_DATA':
      return _objectSpread({}, state, {
        data: action.payload
      });

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

var useWindow = function useWindow() {
  var _useReducer = (0, _react.useReducer)(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  return [state, dispatch];
};

exports.useWindow = useWindow;