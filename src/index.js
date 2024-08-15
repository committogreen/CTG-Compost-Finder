import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CountyProvider } from './components/countyProvider';
import { CityProvider } from './components/cityProvider';
import { DropoffProvider } from './components/dropOffProvider';
import { MicrohaulerProvider } from './components/microhaulerProvider';
import { SmartBinsProvider } from './components/smartBinsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CountyProvider>
      <DropoffProvider>
        <MicrohaulerProvider>
          <SmartBinsProvider>
            <CityProvider>
              <App />
            </CityProvider>
          </SmartBinsProvider>
        </MicrohaulerProvider>
      </DropoffProvider>
    </CountyProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
