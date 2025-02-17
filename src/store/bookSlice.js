import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 書籍リストを取得する非同期処理
export const fetchBooks = createAsyncThunk("books/fetchBooks", async (page) => {
  const response = await fetch(
    `https://railway.bookreview.techtrain.dev/public/books?offset=${page * 10}`
  );
  return await response.json();
});

// 書籍詳細を取得する非同期処理
export const fetchBookById = createAsyncThunk("books/fetchBookById", async (bookId, { dispatch, getState }) => {
  const response = await fetch(`https://railway.bookreview.techtrain.dev/public/books/${bookId}`);
  if (!response.ok) {
    throw new Error("書籍情報の取得に失敗しました");
  }
  const bookData = await response.json();

  // 書籍選択時にログを送信
  const token = getState().auth.token;
  await dispatch(logBookSelection({ selectBookId: bookId, token }));
  return bookData;
});

// 書籍選択ログを送信する非同期処理
export const logBookSelection = createAsyncThunk("books/logBookSelection", async ({ selectBookId, token }) => {
  await fetch("https://railway.bookreview.techtrain.dev/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ selectBookId }),
  });
});

const bookSlice = createSlice({
  name: "books",
  initialState: { books: [], currentBook: null, page: 0, error: null, loading: false },
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
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.error = null;
      })
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true; // ローディング状態を追加
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.currentBook = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { nextPage, prevPage } = bookSlice.actions;
export const selectBooks = (state) => state.books.books;
export const selectPage = (state) => state.books.page;
export const selectCurrentBook = (state) => state.books.currentBook;
export const selectBookError = (state) => state.books.error;
export const selectLoading = (state) => state.books.loading; // ローディング状態を選択
export default bookSlice.reducer;
