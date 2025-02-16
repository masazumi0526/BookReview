import React from "react";
import { Link } from "react-router-dom";
import "../styles/BookList.css";

const BookList = ({ books }) => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-item">
          <Link to={`/public/books/${book.id}`} className="book-link">
            {book.title}（{book.author}）
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
