import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import loginReducer from './reducers/loginReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: loginReducer,
  },
});

export default store;
