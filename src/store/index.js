// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({
  reducer,
  reducer:{
    auth: authReducer,
  },
 

});

export default store;
