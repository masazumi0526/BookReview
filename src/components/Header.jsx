import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // Redux の user ステートを取得
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
            {/* <img src={user.iconUrl} alt="User Icon" className="header__user-icon" /> ユーザーアイコンを表示 */}
            <span className="header__username">{user.name || user.email}</span>
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