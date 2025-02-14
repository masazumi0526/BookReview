import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, selectBooks, selectPage } from "../store/bookSlice";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import "../styles/BookListPage.css";

const BookListPage = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const page = useSelector(selectPage);

  // ページが変更されるたびに API からデータを取得
  useEffect(() => {
    dispatch(fetchBooks(page));
  }, [dispatch, page]);

  return (
    <div className="book-list-container">
      {/* 書籍一覧コンポーネント */}
      <BookList books={books} />
      {/* ページネーションコンポーネント */}
      <Pagination />
    </div>
  );
};

export default BookListPage;