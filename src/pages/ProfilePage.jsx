import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../store/authSlice";
import InputField from "../components/InputField";
import ImageUploader from "../components/ImageUploader";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

const ProfilePage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ユーザー情報を API から取得する関数
  const fetchUserProfile = async () => {
    try {
      const response = await fetch("https://railway.bookreview.techtrain.dev/users", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("ユーザー情報の取得に失敗しました");
      }

      const user = await response.json();
      setValue("username", user.name || "");
      setValue("email", user.email || "");
      setImage(user.iconUrl || null);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // 初回レンダリング時にユーザー情報を取得
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // ユーザー情報をローカルストレージに保存
  const updateUserProfile = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const uploadIcon = async (file) => {
    const formData = new FormData();
    formData.append("icon", file);

    const response = await fetch("https://railway.bookreview.techtrain.dev/uploads", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
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
      let updatedIconUrl = image;
      if (image && image !== localStorage.getItem("user")?.iconUrl) {
        updatedIconUrl = await uploadIcon(image);
      }

      const requestBody = { name: data.username, iconUrl: updatedIconUrl };
      const response = await fetch("https://railway.bookreview.techtrain.dev/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("ユーザー情報の更新に失敗しました");
      }

      setSuccessMessage("ユーザー情報が正常に更新されました。");
      const updatedUser = await response.json();
      updateUserProfile(updatedUser);

      setTimeout(() => navigate("/public/books"), 1000);
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
        <ImageUploader setImage={setImage} initialImage={image} />
        <button type="submit">更新</button>
      </form>
    </div>
  );
};

export default ProfilePage;
