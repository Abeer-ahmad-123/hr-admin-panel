import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import loginReducer from './reducers/loginReducer';
import reportsReducer from './reducers/reportsReducer';
import channelReducer from './reducers/channelReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: loginReducer,
    reports: reportsReducer,
    channels: channelReducer,
  },
});

export default store;
