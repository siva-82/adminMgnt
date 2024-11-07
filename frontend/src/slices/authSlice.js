import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  
  newUser: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  
  },
});

export const { setCredentials, logoutCredentials } =
  authSlice.actions;

export default authSlice.reducer;
