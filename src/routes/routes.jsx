import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import BookListPage from "../pages/BookListPage";
import ProfilePage from "../pages/ProfilePage";
import NewBookPage from "../pages/NewBookPage";  // 追加
import { selectUser } from "../store/authSlice";

const PrivateRoute = ({ element }) => {
  const user = useSelector(selectUser);
  return user ? element : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/public/books" replace />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
      <Route path="/public/books" element={<BookListPage />} />
      <Route path="/new" element={<PrivateRoute element={<NewBookPage />} />} /> {/* 新規書籍レビュー投稿ページ */}
    </Routes>
  );
};

export default AppRoutes;
