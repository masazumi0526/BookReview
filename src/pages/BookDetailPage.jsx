import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookById, selectCurrentBook, selectBookError } from "../store/bookSlice";
import { selectToken } from "../store/authSlice";
import "../styles/BookDetailPage.css";

const BookDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const book = useSelector(selectCurrentBook);
  const error = useSelector(selectBookError);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));

      // 書籍選択ログを送信
      if (token) {
        fetch("https://railway.bookreview.techtrain.dev/logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ selectBookId: id }),
        }).catch((err) => console.error("ログ送信エラー:", err));
      }
    }
  }, [dispatch, id, token]);

  if (!book) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">エラー: {error}</p>;
  }

  return (
    <div className="book-detail-container">
      <h2>{book.title}</h2>
      <p><strong>著者:</strong> {book.author}</p>
      <p><strong>概要:</strong> {book.description}</p>
    </div>
  );
};

export default BookDetailPage;
