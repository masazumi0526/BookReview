import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";

// Redux のストアを作成
const store = configureStore({
  reducer: { books: bookReducer },
});

export default store;