import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!user && storedUser) {
      dispatch(login({ user: storedUser, token: localStorage.getItem("token") }));
    }
  }, [user, dispatch]);

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
