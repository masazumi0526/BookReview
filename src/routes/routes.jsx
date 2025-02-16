import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import BookListPage from "../pages/BookListPage";
import ProfilePage from "../pages/ProfilePage"; // 追加
import { selectUser } from "../store/authSlice";

// プライベートルートの修正
const PrivateRoute = ({ element }) => {
  const user = useSelector(selectUser);
  // ユーザーがいない場合、ログインページにリダイレクト
  return user ? element : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/public/books" replace />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} /> {/* 修正 */}
      <Route path="/public/books" element={<BookListPage />} />
    </Routes>
  );
};

export default AppRoutes;
