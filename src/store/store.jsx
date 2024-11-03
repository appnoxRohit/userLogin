// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice.jsx'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
