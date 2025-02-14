import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 非同期で API から書籍データを取得
export const fetchBooks = createAsyncThunk("books/fetchBooks", async (page) => {
  const response = await fetch(
    `https://railway.bookreview.techtrain.dev/public/books?offset=${page * 10}`
  );
  return await response.json();
});

const bookSlice = createSlice({
  name: "books",
  initialState: { books: [], page: 0 },
  reducers: {
    // 次のページへ進むアクション
    nextPage: (state) => {
      state.page += 1;
    },
    // 前のページへ戻るアクション（最初のページでは動作しない）
    prevPage: (state) => {
      if (state.page > 0) state.page -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.books = action.payload; // 取得した書籍データを状態に保存
    });
  },
});

export const { nextPage, prevPage } = bookSlice.actions;
export const selectBooks = (state) => state.books.books;
export const selectPage = (state) => state.books.page;
export default bookSlice.reducer;