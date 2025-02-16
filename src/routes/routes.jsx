import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import BookListPage from "../pages/BookListPage";
import BookDetailPage from "../pages/BookDetailPage"; // 追加
import ProfilePage from "../pages/ProfilePage";
import NewBookPage from "../pages/NewBookPage";
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
      <Route path="/public/books/:id" element={<BookDetailPage />} /> {/* 追加 */}
      <Route path="/new" element={<PrivateRoute element={<NewBookPage />} />} />
    </Routes>
  );
};

export default AppRoutes;
