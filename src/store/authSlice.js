import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // 初期状態はログインしていない
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;
