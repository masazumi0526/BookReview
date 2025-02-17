import React, { useEffect, useState } from "react";
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
  const [booksWithAuthors, setBooksWithAuthors] = useState([]);

  useEffect(() => {
    dispatch(fetchBooks(page));
  }, [dispatch, page]);

  useEffect(() => {
    const storedAuthors = JSON.parse(localStorage.getItem("book_authors")) || {};
    const updatedBooks = books.map(book => ({
      ...book,
      author: storedAuthors[book.id] || "不明",
    }));
    setBooksWithAuthors(updatedBooks);
  }, [books]);

  return (
    <div>
      <Header />
      <div className="book-list-container">
        <BookList books={booksWithAuthors} />
        <Pagination />
      </div>
    </div>
  );
};

export default BookListPage;