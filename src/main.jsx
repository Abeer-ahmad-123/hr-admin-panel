import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import store from './redux-toolkit/store';
// import store from './redux-toolkit/store';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </SnackbarProvider>
  </Provider>
);
