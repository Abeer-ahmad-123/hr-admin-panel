import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';

// import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  //   middleware: [thunk], // Include Redux Thunk middleware
});

export default store;
