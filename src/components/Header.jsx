import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ローカルストレージからユーザー情報を取得
  const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user")) || null;
  };

  // ユーザー情報を state に格納
  const [user, setUser] = useState(getUserFromLocalStorage());

  useEffect(() => {
    // ページがマウントされたら最新のユーザー情報を取得
    setUser(getUserFromLocalStorage());
  }, [navigate]); // `navigate` の変更を監視し、ページ遷移時に更新

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
            {user.iconUrl && (
              <img src={user.iconUrl} alt="User Icon" className="header__user-icon" />
            )}
            <Link to="/profile" className="header__button">ユーザー情報編集</Link>
            <Link to="/new" className="header__button">レビュー投稿</Link>
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
