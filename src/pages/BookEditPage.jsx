import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById, selectCurrentBook } from "../store/bookSlice";
import { selectToken } from "../store/authSlice";
import "../styles/BookEditPage.css";

const BookEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector(selectCurrentBook);
  const token = useSelector(selectToken);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(fetchBookById(id));
    }
  }, [dispatch, id, token]);

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setUrl(book.url || "");
      setDetail(book.detail || "");
      setReview(book.review || "");
      setReviewer(book.reviewer || "");
    }
  }, [book]);

  const handleUpdate = async () => {
    if (!book) return;

    try {
      const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: book.id,
          title,
          url,
          detail,
          review,
          reviewer,
          isMine: book.isMine,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "更新に失敗しました");
      }

      alert("更新しました");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("本当に削除しますか？")) return;

    try {
      const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "削除に失敗しました");
      }

      alert("削除しました");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  if (!book) {
    return <p className="loading-text">読み込み中...</p>;
  }

  return (
    <div className="edit-container">
      <h2 className="edit-title">レビュー編集</h2>

      {error && <p className="error-message">{error}</p>}

      <label className="edit-label">タイトル</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="edit-input"
      />

      <label className="edit-label">URL</label>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="edit-input"
      />

      <label className="edit-label">詳細</label>
      <textarea
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        className="edit-textarea"
      />

      <label className="edit-label">レビュー</label>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="edit-textarea"
      />

      <label className="edit-label">レビュワー</label>
      <input
        type="text"
        value={reviewer}
        onChange={(e) => setReviewer(e.target.value)}
        className="edit-input"
      />

      <button onClick={handleUpdate} className="update-button">更新</button>
      <button onClick={handleDelete} className="delete-button">削除</button>
    </div>
  );
};

export default BookEditPage;