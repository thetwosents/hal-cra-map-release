import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // The component defined in this project
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Get the mapbox access key from the root element data-mapbox-access-key attribute
// Get data-mapbox-access-key value
const mapboxAccessKey = document.getElementById('root').getAttribute('data-mapbox-access-key');

root.render(
  <React.StrictMode>
    <App 
      mapboxAccessKey={mapboxAccessKey} 
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
