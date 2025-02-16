import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "../store/authSlice";
import InputField from "../components/InputField";
import "../styles/form.css";

const ProfilePage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector(selectUser);  // Reduxからユーザー情報を取得
  const token = useSelector(selectToken); // トークンを取得

  useEffect(() => {
    if (user) {
      setValue("username", user.name); // フォームにユーザー名をセット
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://railway.bookreview.techtrain.dev/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name: data.username }), // ユーザー名を更新
      });

      if (!response.ok) {
        throw new Error("ユーザー情報の更新に失敗しました");
      }

      // 更新後に書籍一覧画面に遷移
      navigate("/public/books");
    } catch (error) {
      setErrorMessage(error.message); // エラーメッセージ表示
    }
  };

  return (
    <div className="form-container">
      <h2>ユーザー情報編集</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField
          label="ユーザー名"
          type="text"
          name="username"
          register={register}
          validation={{ required: "必須項目です" }}
          error={errors.username}
        />
        <button type="submit">更新</button>
      </form>
    </div>
  );
};

export default ProfilePage;