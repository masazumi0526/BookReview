import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, selectBooks, selectPage } from "../store/bookSlice";
import { selectUser } from "../store/authSlice";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
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
      <Header />
      <div className="book-list-container">
        <BookList books={books} currentUserId={user?.id} />
        <Pagination />
      </div>
    </div>
  );
};

export default BookListPage;
