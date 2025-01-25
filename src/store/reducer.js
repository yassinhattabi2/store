// src/store/reducer.js
import { combineReducers } from 'redux';
import cartReducer from './Slices/cartSlice';
import customizationReducer from './customizationReducer';
import authReducer from './Slices/authSlice';
const reducer = combineReducers({
  cart: cartReducer,
   auth: authReducer,
   customization: customizationReducer,
   
  
});

export default reducer;
