import React from "react";
import { Link } from "react-router-dom";
import "../styles/BookList.css";

// BookList コンポーネントを定義
// 引数 books は、書籍の情報を含む配列です
const BookList = ({ books }) => {
  return (
    // 書籍リストを表示するための ul 要素
    <ul className="book-list">
      {/* books 配列を map 関数でループして、書籍情報を表示 */}
      {books.map((book) => (
        <li key={book.id} className="book-item">
          {/* 書籍詳細ページへのリンク */}
          <Link to={`/public/books/${book.id}`} className="book-link">
            {/* タイトルと著者名を「タイトル：」と「著者：」の形式で表示 */}
            <div>書籍名：{book.title}</div>
            <div>著者：{book.author}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

// BookList コンポーネントをエクスポートして、他のファイルで使用できるようにします
export default BookList;
