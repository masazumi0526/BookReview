import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user")) || null;
  };

  const [user, setUser] = useState(getUserFromLocalStorage());

  useEffect(() => {
    setUser(getUserFromLocalStorage());
  }, [navigate]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <h1 className="header__title">BookReview</h1>
      <nav className="header__nav">
        {user ? (
          <div className="header__user-info">
            {user.iconUrl && (
              <img src={user.iconUrl} alt="User Icon" className="header__user-icon" />
            )}
            <span className="header__username">{user.name}</span>
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