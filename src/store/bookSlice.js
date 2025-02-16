import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 📌 書籍リストを取得する非同期処理
export const fetchBooks = createAsyncThunk("books/fetchBooks", async (page) => {
  const response = await fetch(
    `https://railway.bookreview.techtrain.dev/public/books?offset=${page * 10}`
  );
  return await response.json();
});

// 📌 書籍詳細を取得する非同期処理（追加）
export const fetchBookById = createAsyncThunk("books/fetchBookById", async (bookId) => {
  const response = await fetch(`https://railway.bookreview.techtrain.dev/public/books/${bookId}`);
  if (!response.ok) {
    throw new Error("書籍情報の取得に失敗しました");
  }
  return await response.json();
});

const bookSlice = createSlice({
  name: "books",
  initialState: { books: [], currentBook: null, page: 0, error: null },
  reducers: {
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      if (state.page > 0) state.page -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // 📌 書籍リスト取得成功時
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.error = null;
      })
      // 📌 書籍詳細取得成功時（追加）
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.currentBook = action.payload;
        state.error = null;
      })
      // 📌 書籍詳細取得失敗時（追加）
      .addCase(fetchBookById.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { nextPage, prevPage } = bookSlice.actions;
export const selectBooks = (state) => state.books.books;
export const selectPage = (state) => state.books.page;
export const selectCurrentBook = (state) => state.books.currentBook; // 📌 追加
export const selectBookError = (state) => state.books.error; // 📌 追加
export default bookSlice.reducer;
