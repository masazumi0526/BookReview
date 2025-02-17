import React from "react";
import { Link } from "react-router-dom";
import "../styles/BookList.css";

const BookList = ({ books }) => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-item">
          <Link to={`/public/books/${book.id}`}>
            <h3>{book.title}</h3>
            <p>著者: {book.author}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
