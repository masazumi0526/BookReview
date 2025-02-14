import React, { useEffect, useState } from "react";
import "../styles/BookListPage.css";// 外部CSSをインポート

const BookListPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://railway.bookreview.techtrain.dev/public/books?offset=0")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book-item" key={book.id}>
          <h2 className="book-item__title">{book.title}</h2>
          <p className="book-item__author">著者: {book.author}</p>
          <p className="book-item__description">{book.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BookListPage;
