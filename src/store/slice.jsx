import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    authFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { registerSuccess, authFailure } = AuthSlice.actions;
export default AuthSlice.reducer;
