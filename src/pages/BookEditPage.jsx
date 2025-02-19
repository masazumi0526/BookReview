import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById, selectCurrentBook } from "../store/bookSlice";
import { selectToken } from "../store/authSlice";

const BookEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector(selectCurrentBook);
  const token = useSelector(selectToken);
  
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(fetchBookById(id));
    }
  }, [dispatch, id, token]);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setReview(book.review);
    }
  }, [book]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, review }),
      });

      if (response.ok) {
        alert("更新しました");
        navigate("/");
      } else {
        throw new Error("更新に失敗しました");
      }
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
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

      if (response.ok) {
        alert("削除しました");
        navigate("/");
      } else {
        throw new Error("削除に失敗しました");
      }
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div>
      <h2>レビュー編集</h2>
      <label>タイトル</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>レビュー</label>
      <textarea value={review} onChange={(e) => setReview(e.target.value)} />
      <button onClick={handleUpdate}>更新</button>
      <button onClick={handleDelete} style={{ color: "red" }}>削除</button>
    </div>
  );
};

export default BookEditPage;