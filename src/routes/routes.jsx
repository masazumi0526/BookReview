import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import BookListPage from "../pages/BookListPage";  // 書籍レビュー一覧ページのインポート
 
const AppRoutes = () => {
  return (
    <Routes>
      {/* 初期ページ（"/"）にアクセスしたら "/login" にリダイレクト */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/public/books" element={<BookListPage />} />  {/* 書籍レビュー一覧ページのルート */}
    </Routes>
  );
};
 
export default AppRoutes;