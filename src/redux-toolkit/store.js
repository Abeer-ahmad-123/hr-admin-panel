import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducers/userReducer';
import loginReducer from './reducers/loginReducer';
import reportsReducer from './reducers/reportsReducer';
import channelReducer from './reducers/channelReducer';
import expiredTokenReducer from './reducers/expiredTokenReducer';
import DashboardReducer from './reducers/DashboardReducer';

const persistConfig = {
  key: 'auth',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, loginReducer);

const store = configureStore({
  reducer: {
    dashboard: DashboardReducer,
    auth: persistedReducer,
    user: userReducer,
    reports: reportsReducer,
    channels: channelReducer,
    expiredToken: expiredTokenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;
