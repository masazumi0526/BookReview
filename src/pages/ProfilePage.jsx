import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken, login } from "../store/authSlice";
import InputField from "../components/InputField";
import ImageUploader from "../components/ImageUploader";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

const ProfilePage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 `null` で初期化し、`useEffect` で `user` の値をセット
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // 🔹 `user` のデータを Redux から取得し、フォームに反映
  useEffect(() => {
    console.log("Redux user:", user); // デバッグ用
    if (user) {
      setValue("username", user.name || "");
      setValue("email", user.email || "");
      setValue("password", "********"); // パスワードは隠す
      setImage(user.iconUrl || null);
    }
  }, [user, setValue]);

  // 🔹 アイコン画像アップロード処理
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

  // 🔹 ユーザー情報更新処理
  const onSubmit = async (data) => {
    try {
      let updatedIconUrl = image;

      if (image && image !== user?.iconUrl) {
        updatedIconUrl = await uploadIcon(image, token);
      }

      const requestBody = {
        name: data.username,
        email: data.email,
        password: data.password !== "********" ? data.password : undefined,
        iconUrl: updatedIconUrl,
      };

      const response = await fetch("https://railway.bookreview.techtrain.dev/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("ユーザー情報の更新に失敗しました");
      }

      setSuccessMessage("ユーザー情報が正常に更新されました。");

      const updatedUser = await response.json();
      dispatch(login({ user: updatedUser, token }));

      setTimeout(() => {
        navigate("/public/books");
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>ユーザー情報編集</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField
          label="ユーザー名"
          type="text"
          name="username"
          register={register}
          validation={{ required: "必須項目です" }}
          error={errors.username}
        />
        <InputField
          label="メールアドレス"
          type="email"
          name="email"
          register={register}
          validation={{ required: "必須項目です" }}
          error={errors.email}
        />
        <InputField
          label="パスワード"
          type="password"
          name="password"
          register={register}
          validation={{ required: "必須項目です", minLength: { value: 6, message: "6文字以上必要です" } }}
          error={errors.password}
        />

        {/* 🔹 `initialImage={image}` を渡して、デフォルト画像を適用 */}
        <ImageUploader setImage={setImage} initialImage={image} />

        <button type="submit">更新</button>
      </form>
    </div>
  );
};

export default ProfilePage;
