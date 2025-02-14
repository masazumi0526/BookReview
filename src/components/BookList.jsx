import React from "react";

const BookList = ({ books }) => {
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

export default BookList;