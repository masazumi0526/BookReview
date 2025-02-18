import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, selectBooks, selectPage } from "../store/bookSlice";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import "../styles/BookListPage.css";

const BookListPage = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const page = useSelector(selectPage);

  useEffect(() => {
    dispatch(fetchBooks(page));
  }, [dispatch, page]);

  return (
    <div>
      <Header />
      <div className="book-list-container">
        <BookList books={books} />
        <Pagination />
      </div>
    </div>
  );
};

export default BookListPage;