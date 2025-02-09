import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import "../styles/form.css";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://api.example.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("ログインに失敗しました");
      }

      navigate("/dashboard"); // ダッシュボード画面に遷移
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>ログイン</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
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
