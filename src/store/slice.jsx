// src/store/slice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;  // Set the logged-in user's data
      state.isAuthenticated = true;  // Mark as authenticated
    },
    logout(state) {
      state.user = null;              // Clear user data on logout
      state.isAuthenticated = false;
        // Mark as not authenticated
    },
  },
});

export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;
