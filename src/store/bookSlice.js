import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 書籍リストを取得する非同期処理
export const fetchBooks = createAsyncThunk("books/fetchBooks", async (page, { getState }) => {
  const token = getState().auth.token; // トークンを取得
  const userId = getState().auth.user?.id; // ログインユーザーのIDを取得

  let url = `https://railway.bookreview.techtrain.dev/public/books?offset=${page * 10}`;

  if (token) {
    // ログインしている場合、/books にアクセス
    url = `https://railway.bookreview.techtrain.dev/books?offset=${page * 10}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: token ? { "Authorization": `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    throw new Error("書籍リストの取得に失敗しました");
  }

  const booksData = await response.json();

  // ログインしている場合、書籍情報に isMine フィールドを追加
  return booksData.map(book => ({
    ...book,
    isMine: token ? book.userId === userId : false, // ログインユーザーの投稿かどうか
  }));
});

// 書籍詳細を取得する非同期処理
export const fetchBookById = createAsyncThunk("books/fetchBookById", async (bookId, { dispatch, getState }) => {
  const token = getState().auth.token; // トークンを取得
  const userId = getState().auth.user?.id; // ログインユーザーのID

  if (!token) {
    throw new Error("トークンが存在しません"); // トークンがなければエラー
  }

  const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${bookId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`, // トークンをAuthorizationヘッダーに追加
    },
  });

  if (!response.ok) {
    throw new Error("書籍情報の取得に失敗しました");
  }

  const bookData = await response.json();

  // 書籍選択時にログを送信
  await dispatch(logBookSelection({ selectBookId: bookId, token }));

  return {
    ...bookData,
    isMine: bookData.userId === userId, // ログインユーザーの投稿かどうか
  };
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
        state.loading = true;
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
export const selectLoading = (state) => state.books.loading;
export default bookSlice.reducer;
