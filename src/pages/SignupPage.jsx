import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import InputField from "../components/InputField";
import ImageUploader from "../components/ImageUploader";
import "../styles/form.css";

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const uploadIcon = async (file, token) => {
    const formData = new FormData();
    formData.append("icon", file);
    
    const response = await fetch("https://railway.bookreview.techtrain.dev/uploads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error("アイコンのアップロードに失敗しました");
    }

    const result = await response.json();
    return result.iconUrl;
  };

  const onSubmit = async (data) => {
    try {
      const requestBody = {
        name: data.username,
        email: data.email,
        password: data.password,
      };

      const userResponse = await fetch("https://railway.bookreview.techtrain.dev/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const userResult = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error(userResult.ErrorMessageJP || "ユーザー登録に失敗しました");
      }

      let iconUrl = "";
      if (image) {
        iconUrl = await uploadIcon(image, userResult.token);
      }

      const userData = { email: data.email, name: data.username, iconUrl };
      dispatch(login({ user: userData, token: userResult.token }));
      localStorage.setItem("user", JSON.stringify(userData));
      
      navigate("/public/books");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>新規登録</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField label="ユーザー名" type="text" name="username" register={register} validation={{ required: "必須項目です" }} error={errors.username} />
        <InputField 
          label="メールアドレス" 
          type="email" 
          name="email" 
          register={register} 
          validation={{ 
            required: "必須項目です", 
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "正しいメールアドレスを入力してください" } 
          }} 
          error={errors.email} 
        />
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
