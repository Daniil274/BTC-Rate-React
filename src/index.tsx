import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Calculator} from "./App";
import {Rate} from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Rate />
    <Calculator />
  </React.StrictMode>,
  document.getElementById('btc-rate-checker')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
