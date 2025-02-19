import React from "react";
import { Link } from "react-router-dom";
import "../styles/BookList.css";

const BookList = ({ books, currentUserId }) => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-item">
          <Link to={`/public/books/${book.id}`}>
            <h3>{book.title}</h3>
            <p>著者: {book.author}</p>
          </Link>
          {/* ログインユーザーの投稿なら編集ボタンを表示 */}
          {book.userId === currentUserId && (
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
