// src/routes/routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import BookListPage from "../pages/BookListPage";
import ProfilePage from "../pages/ProfilePage"; // 追加
import { selectUser } from "../store/authSlice";

const PrivateRoute = ({ element }) => {
  const user = useSelector(selectUser);
  return user ? <Navigate to="/public/books" replace /> : element;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/public/books" replace />} />
      <Route path="/signup" element={<PrivateRoute element={<SignupPage />} />} />
      <Route path="/login" element={<PrivateRoute element={<LoginPage />} />} />
      <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} /> {/* 追加 */}
      <Route path="/public/books" element={<BookListPage />} />
    </Routes>
  );
};

export default AppRoutes;
