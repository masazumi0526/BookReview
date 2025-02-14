import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import BookListPage from "../pages/BookListPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 初期ページ（"/"）にアクセスしたら 書籍一覧ページにリダイレクト */}
      <Route path="/" element={<Navigate to="/public/books" replace />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/public/books" element={<BookListPage />} />
    </Routes>
  );
};

export default AppRoutes;