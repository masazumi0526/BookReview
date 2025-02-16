import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import BookListPage from "../pages/BookListPage";
import { selectUser } from "../store/authSlice";

const PrivateRoute = ({ element }) => {
  const user = useSelector(selectUser);
  return user ? <Navigate to="/public/books" replace /> : element;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* 初期ページ（"/"）にアクセスしたら 書籍一覧ページにリダイレクト */}
      <Route path="/" element={<Navigate to="/public/books" replace />} />
      
      {/* ログイン済みの場合は書籍一覧にリダイレクト */}
      <Route path="/signup" element={<PrivateRoute element={<SignupPage />} />} />
      <Route path="/login" element={<PrivateRoute element={<LoginPage />} />} />
      
      <Route path="/public/books" element={<BookListPage />} />
    </Routes>
  );
};

export default AppRoutes;
