import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CustomersContextProvider } from './context/CustomersContext'
import { AuthContextProvider } from './context/AuthContext'
import { CalendarContextProvider } from './context/CalendarContext';
import { DetailsContextProvider } from './context/DetailsContext';
import { ScheduleContextProvider } from './context/ScheduleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <DetailsContextProvider>
      <CustomersContextProvider>
        <CalendarContextProvider>
          <ScheduleContextProvider>
            <App />
          </ScheduleContextProvider>
        </CalendarContextProvider>
      </CustomersContextProvider>
    </DetailsContextProvider>
  </AuthContextProvider>
);