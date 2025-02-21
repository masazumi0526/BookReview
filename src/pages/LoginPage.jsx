import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import InputField from "../components/InputField";
import "../styles/form.css";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://railway.bookreview.techtrain.dev/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.ErrorMessageJP);
      }

      // ユーザー情報を取得
      const userProfileResponse = await fetch("https://railway.bookreview.techtrain.dev/users", {
        method: "GET",
        headers: { Authorization: `Bearer ${result.token}` },
      });

      const user = await userProfileResponse.json();

      // Redux と localStorage に保存
      dispatch(login({ user, token: result.token }));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", result.token);

      navigate("/public/books");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>ログイン</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField label="メールアドレス" type="email" name="email" register={register} validation={{ required: "必須項目です" }} error={errors.email} />
        <InputField label="パスワード" type="password" name="password" register={register} validation={{ required: "必須項目です" }} error={errors.password} />
        <button type="submit">ログイン</button>
      </form>
      <p>
        アカウントをお持ちでないですか？ <a href="/signup">新規登録</a>
      </p>
    </div>
  );
};

export default LoginPage;