import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">
      <h1 className="header__title">BookReview</h1>
      <nav className="header__nav">
        {user ? (
          <div className="header__user-info">
            <span className="header__username">{user.name || user.email}</span>
            <Link to="/profile" className="header__button">ユーザー情報編集</Link>
            <Link to="/new" className="header__button">レビュー投稿</Link> {/* 書籍レビュー投稿へのリンク追加 */}
            <button className="header__button" onClick={handleLogout}>
              ログアウト
            </button>
          </div>
        ) : (
          <Link to="/login" className="header__button">ログイン</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;