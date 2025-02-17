import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // ローカルストレージから取得
  token: localStorage.getItem("token") || null, // ローカルストレージから取得
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user; // ユーザー情報保存
      state.token = action.payload.token; // トークン保存
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // トークンをローカルストレージに保存
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user"); // ローカルストレージから削除
      localStorage.removeItem("token"); // ローカルストレージから削除
    },
  },
});

export const { login, setToken, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;