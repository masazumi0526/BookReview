import React from "react";
import { Helmet } from "react-helmet"; // Helmetをインポート
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

const BookListPage = ({ books }) => {
  return (
    <div>
      {/* Helmetを使ってmeta descriptionを追加 */}
      <Helmet>
        <meta
          name="description"
          content="書籍一覧ページでは、最新の書籍やレビューをチェックできます。多様なジャンルの書籍をご覧ください。"
        />
        <title>書籍一覧</title>
      </Helmet>

      <div className="book-list-container">
        <BookList books={books} />
      </div>
    </div>
  );
};

export default BookListPage;
