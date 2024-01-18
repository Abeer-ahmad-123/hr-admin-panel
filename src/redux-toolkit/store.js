import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import loginReducer from './reducers/loginReducer';
// import thunk from 'redux-thunk';

// import productReducer from "./reducers/productReducer";
// import authReducer from "./reducers/authReducer";
// import userReducer from './reducers/userReducer';
// import cartReducer from "./reducers/cartReducer";
// import orderReducer from "./reducers/orderReducer";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    user: userReducer,
    auth: loginReducer,
    // product: productReducer,
    // cart: cartReducer,
    // order: orderReducer,
  },
  //   middleware: [thunk], // Include Redux Thunk middleware
});

export default store;
