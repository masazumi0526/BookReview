import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import BookListPage from "../pages/BookListPage";
import BookDetailPage from "../pages/BookDetailPage";
import ProfilePage from "../pages/ProfilePage";
import NewBookPage from "../pages/NewBookPage";
import BookEditPage from "../pages/BookEditPage"; // 追加
import { selectUser } from "../store/authSlice";

const PrivateRoute = ({ element }) => {
  const user = useSelector(selectUser);
  return user ? element : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const user = useSelector(selectUser);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/public/books" replace />} />
      <Route 
        path="/signup" 
        element={user ? <Navigate to="/public/books" replace /> : <SignupPage />} 
      />
      <Route 
        path="/login" 
        element={user ? <Navigate to="/public/books" replace /> : <LoginPage />} 
      />
      <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
      <Route path="/public/books" element={<BookListPage />} />
      <Route path="/public/books/:id" element={<BookDetailPage />} /> {/* 書籍詳細ページ */}
      <Route path="/new" element={<PrivateRoute element={<NewBookPage />} />} />
      <Route path="/edit/:id" element={<PrivateRoute element={<BookEditPage />} />} /> {/* 編集ページ追加 */}
    </Routes>
  );
};

export default AppRoutes;