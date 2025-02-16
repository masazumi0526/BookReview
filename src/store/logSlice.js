import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ログを送信する非同期アクション
export const postLog = createAsyncThunk("logs/postLog", async (logData) => {
  const response = await fetch("https://railway.bookreview.techtrain.dev/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${logData.token}`,
    },
    body: JSON.stringify(logData),
  });
  return await response.json();
});

const logSlice = createSlice({
  name: "logs",
  initialState: { logs: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postLog.fulfilled, (state, action) => {
      // ログ送信後の処理（必要に応じて追加）
    });
  },
});

export default logSlice.reducer;
