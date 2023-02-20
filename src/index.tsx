import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from './shared/redux';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { MantineProvider, Button, AppShell, Header } from '@mantine/core';
import { NavigationProgress, setNavigationProgress } from '@mantine/nprogress';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let persistor = persistStore(store);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <MantineProvider theme={{ colorScheme: 'dark', fontFamily: 'inherit' }}>
          <AppShell className='dfa-app-shell flex flex-col' padding={0}>
            <NavigationProgress/>
              <App/>
          </AppShell>
        </MantineProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
