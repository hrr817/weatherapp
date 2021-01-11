"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertUTCTimestamp = convertUTCTimestamp;
exports.setBackgroundAsWeather = setBackgroundAsWeather;
exports.toTwelveHourClock = exports.getCurrentWeather = exports.getLocation = exports.getLocationCoord = exports.getLocationDB = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ACCESS KEY FOR WEATHERSTACK API 
var ACCESS_KEY = process.env.REACT_APP_OPENWEATHER_API_ACCESS_KEY; // For initial start, get location through geolocation-db

var getLocationDB = function getLocationDB() {
  return regeneratorRuntime.async(function getLocationDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get('https://geolocation-db.com/json/').then(function (res) {
            return res.data;
          })["catch"](function (e) {
            return e;
          }));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}; // Get location coords through opencagedata


exports.getLocationDB = getLocationDB;

var getLocationCoord = function getLocationCoord(place) {
  return regeneratorRuntime.async(function getLocationCoord$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("https://api.opencagedata.com/geocode/v1/json?q=".concat(place, "&key=").concat(process.env.REACT_APP_OPENCAGEDATA_API_ACCESS_KEY)).then(function (res) {
            return res;
          })["catch"](function (e) {
            return e;
          }));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // Get location information through opencagedata


exports.getLocationCoord = getLocationCoord;

var getLocation = function getLocation(lat, lon) {
  return regeneratorRuntime.async(function getLocation$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("https://api.opencagedata.com/geocode/v1/json?q=".concat(lat, "+").concat(lon, "&key=").concat(process.env.REACT_APP_OPENCAGEDATA_API_ACCESS_KEY)).then(function (res) {
            return res.data;
          })["catch"](function (e) {
            return e;
          }));

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // Get weather data from openweather


exports.getLocation = getLocation;

var getCurrentWeather = function getCurrentWeather(lat, lon, unit) {
  return regeneratorRuntime.async(function getCurrentWeather$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("https://api.openweathermap.org/data/2.5/onecall?lat=".concat(lat, "&lon=").concat(lon, "&units=").concat(unit, "&appid=").concat(ACCESS_KEY)).then(function (res) {
            return res;
          })["catch"](function (e) {
            return e;
          }));

        case 2:
          return _context4.abrupt("return", _context4.sent);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getCurrentWeather = getCurrentWeather;

function convertUTCTimestamp(timestamp) {
  var date = new Date(timestamp * 1000);
  return date;
}

var toTwelveHourClock = function toTwelveHourClock(hour) {
  var InTwelveHour = {
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
  return hour > 12 ? InTwelveHour[hour] : hour;
}; // set background according to weather


exports.toTwelveHourClock = toTwelveHourClock;

function setBackgroundAsWeather(id, time) {
  // id = weather id, time = day or night
  var weather;

  if (id === 800) {
    if (time === 'd') {
      weather = 'clear-day';
    } else {
      weather = 'clear-night';
    }
  } else if (id > 199 && id < 233) {
    weather = 'thunderstrom';
  } else if (id > 299 && id < 322) {
    weather = 'drizzle';
  } else if (id > 499 && id < 532) {
    weather = 'rainy';
  } else if (id > 599 && id < 623) {
    weather = 'snow';
  } else if (id > 699 && id < 782) {
    weather = 'atmosphere';
  } else if (id > 799 && id < 805) {
    weather = 'cloudy';
  } else {
    weather = 'no-weather-background';
  }

  weather && document.getElementsByTagName('body')[0].setAttribute('data-weather', weather);
}