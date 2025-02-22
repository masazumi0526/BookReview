import React from "react";
import { Link } from "react-router-dom";
import "../styles/BookList.css";

const BookList = ({ books }) => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-item">
          <Link to={`/public/books/${book.id}`}>
            <h1>{book.title}</h1>
            <p>著者: {book.author}</p>
          </Link>
          {/* ログインユーザーの投稿なら編集ボタンを表示 */}
          {book.isMine && (
            <Link to={`/edit/${book.id}`} className="edit-button">
              編集
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
