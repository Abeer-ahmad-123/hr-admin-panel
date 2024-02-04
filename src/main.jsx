import { Suspense } from 'react';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import store, { persistor } from './redux-toolkit/store';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <SnackbarProvider maxSnack={3}>
        <HelmetProvider>
          <BrowserRouter>
            <Suspense>
              <App />
            </Suspense>
          </BrowserRouter>
        </HelmetProvider>
      </SnackbarProvider>
    </PersistGate>
  </Provider>
);
