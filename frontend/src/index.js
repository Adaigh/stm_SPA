import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CustomersContextProvider } from './context/CustomersContext'
import { AuthContextProvider } from './context/AuthContext'
import { CalendarContextProvider } from './context/CalendarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <CustomersContextProvider>
      <CalendarContextProvider>
        <App />
      </CalendarContextProvider>
    </CustomersContextProvider>
  </AuthContextProvider>
);