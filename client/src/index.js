import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './app/store';
import { stockApi } from './features/stock/stockApiSlice';
// import { apiSlice } from './app/api/apiSlice';
const root = ReactDOM.createRoot(document.getElementById('root'));

// store.dispatch(stockApi.endpoints.getStocks.initiate());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


