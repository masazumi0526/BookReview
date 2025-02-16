import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);  // ログイン状態の取得

  return (
    <header className="header">
      <h1 className="header__title">BookReview</h1>
      <nav className="header__nav">
        {user ? (
          <div className="header__user-info">
            <span className="header__username">{user.name || user.email}</span> {/* ユーザー名またはメールアドレスの表示 */}
            <Link to="/profile" className="header__button">ユーザー情報編集</Link> {/* ユーザー情報編集リンク */}
            <button className="header__button" onClick={() => dispatch(logout())}>
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