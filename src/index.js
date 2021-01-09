import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

let theme = localStorage.getItem('weatherapp-theme');

if(theme) {
  document.getElementsByTagName('body')[0].setAttribute('data-theme', theme);
} else {
  localStorage.setItem('weatherapp-theme', 'light');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
