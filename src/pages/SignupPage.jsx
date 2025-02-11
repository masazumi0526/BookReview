import { useForm } from "react-hook-form";
import { useState } from "react";
import Compressor from "compressorjs";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import ImageUploader from "../components/ImageUploader";
import "../styles/form.css";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (image) {
        formData.append("icon", image);
      }

      const response = await fetch("https://railway.bookreview.techtrain.dev/users", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.ErrorMessageJP);
      }

      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>新規登録</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}noValidate>
        <InputField label="ユーザー名" type="text" name="username" register={register} validation={{ required: "必須項目です" }} error={errors.username} />
        <InputField label="メールアドレス" type="email" name="email" register={register} validation={{ required: "必須項目です" }} error={errors.email} />
        <InputField label="パスワード" type="password" name="password" register={register} validation={{ required: "必須項目です", minLength: { value: 6, message: "6文字以上必要です" } }} error={errors.password} />

        <ImageUploader setImage={setImage} />

        <button type="submit">登録</button>
      </form>
      <p>
        すでにアカウントをお持ちですか？ <a href="/login">ログイン</a>
      </p>
    </div>
  );
};

export default SignupPage;
