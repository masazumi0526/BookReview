import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookById, selectCurrentBook, selectBookError, selectLoading } from "../store/bookSlice";
import { selectToken } from "../store/authSlice"; // ✅ 修正: `selectToken` をインポート
import "../styles/BookDetailPage.css";

const BookDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const book = useSelector(selectCurrentBook);
  const error = useSelector(selectBookError);
  const loading = useSelector(selectLoading);
  const token = useSelector(selectToken); // ✅ 修正: `selectToken` を取得

  useEffect(() => {
    console.log("Fetching book with ID:", id);
    console.log("Token:", token); // ✅ デバッグ用ログ
    if (id) {
      dispatch(fetchBookById(id));
    }
  }, [dispatch, id, token]); // ✅ `token` も依存配列に追加

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">エラー: {error}</p>;
  }

  if (!book) {
    return <p>データがありません。</p>;
  }

  return (
    <div className="book-detail-container">
      <h2>{book.title}</h2>
      <p><strong>著者:</strong> {book.reviewer}</p>
      <p><strong>詳細:</strong> {book.detail}</p>
      <p><strong>レビュー:</strong> {book.review}</p>
    </div>
  );
};

export default BookDetailPage;
