import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CustomersContextProvider } from './context/CustomersContext'
import { AuthContextProvider } from './context/AuthContext'
import { CalendarContextProvider } from './context/CalendarContext';
import { DetailsContextProvider } from './context/DetailsContext';
import { ScheduleContextProvider } from './context/ScheduleContext';
import { AccountsContextProvider } from './context/AccountsContext';
import { RecipientsContextProvider } from './context/RecipientsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CalendarContextProvider>
    <AuthContextProvider>
      <DetailsContextProvider>
        <CustomersContextProvider>
          <ScheduleContextProvider>
            <AccountsContextProvider>
              <RecipientsContextProvider>
                <App />
              </RecipientsContextProvider>
            </AccountsContextProvider>
          </ScheduleContextProvider>
        </CustomersContextProvider>
      </DetailsContextProvider>
    </AuthContextProvider>
  </CalendarContextProvider>
);