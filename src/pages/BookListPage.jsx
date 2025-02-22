import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, selectBooks, selectPage } from "../store/bookSlice";
import { selectUser } from "../store/authSlice";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import { Helmet } from "react-helmet"; // react-helmetのインポート
import "../styles/BookListPage.css";

const BookListPage = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const page = useSelector(selectPage);
  const user = useSelector(selectUser); // ログインユーザー取得

  useEffect(() => {
    dispatch(fetchBooks(page));
  }, [dispatch, page]);

  return (
    <div>
      <Helmet>
        <meta name="description" content="書籍一覧ページでは、最新の書籍やレビューをチェックできます。多様なジャンルの書籍をご覧ください。" />
        <title>書籍一覧</title>
      </Helmet>
      <Header />
      <div className="book-list-container">
        <BookList books={books} currentUserId={user?.id} />
        <Pagination />
      </div>
    </div>
  );
};

export default BookListPage;
