import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem("user" ) || {},
  token: localStorage.getItem("token")|| null,              // Add token to the initial state
  isAuthenticated: false,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;       // Store user data
      state.token = action.payload.token;      // Store token
      state.isAuthenticated = true;            // Mark as authenticated
    },
    logout(state) {
      state.user = null;                       // Clear user data on logout
      state.token = null;                      // Clear token
      state.isAuthenticated = false;  
      localStorage.removeItem("token");
      localStorage.removeItem("user");         
    },
    editUser: (state, action) => {
      state.user = { ...state.user, ...action.payload.data.user };
      localStorage.setItem("user", action.payload.data.user);
    },
    
  },
});

export const { setUser, logout ,editUser } = loginSlice.actions;
export default loginSlice.reducer;
