import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import authReducer from "./authSlice"; // 追加

const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer, // 追加
  },
});

export default store;
