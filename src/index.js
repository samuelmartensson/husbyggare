import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootEl = document.getElementById('md-react-app');
if (rootEl) {
  const settings = JSON.parse(rootEl.getAttribute('data-default-settings'));
  ReactDOM.render(
    <React.StrictMode>
      <App settings={settings} />
    </React.StrictMode>,
    rootEl
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
