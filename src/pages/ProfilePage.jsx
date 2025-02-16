import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken, login } from "../store/authSlice";
import InputField from "../components/InputField";
import ImageUploader from "../components/ImageUploader";
import { useNavigate } from "react-router-dom"; // 追加
import "../styles/form.css";

const ProfilePage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 追加
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // 初回レンダリング時にユーザー情報をフォームにセット
  useEffect(() => {
    if (user) {
      setValue("username", user.name);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  // アイコン画像アップロード処理
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
    return result.iconUrl; // 新しいアイコンURLを返す
  };

  // ユーザー情報更新処理
  const onSubmit = async (data) => {
    try {
      let updatedIconUrl = user.iconUrl; // 現在のアイコンURLを維持

      if (image) {
        updatedIconUrl = await uploadIcon(image, token); // 新しいアイコンをアップロード
      }

      const requestBody = {
        name: data.username,
        email: data.email,
        password: data.password, // パスワード変更があれば更新
        iconUrl: updatedIconUrl, // 更新されたアイコンURL
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

      // 成功メッセージを設定
      setSuccessMessage("ユーザー情報が正常に更新されました。");

      // 認証されたユーザー情報を Redux ストアに再設定（オプション）
      const updatedUser = await response.json();
      dispatch(login({ user: updatedUser, token }));

      // 書籍一覧画面に遷移
      setTimeout(() => {
        navigate("/public/books"); // 1秒後に書籍一覧画面に遷移
      }, 1000); // 遷移前に少し待機
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>ユーザー情報編集</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>} {/* 成功メッセージ */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField label="ユーザー名" type="text" name="username" register={register} validation={{ required: "必須項目です" }} error={errors.username} />
        <InputField label="メールアドレス" type="email" name="email" register={register} validation={{ required: "必須項目です" }} error={errors.email} />
        <InputField label="パスワード" type="password" name="password" register={register} validation={{ required: "必須項目です", minLength: { value: 6, message: "6文字以上必要です" } }} error={errors.password} />

        <ImageUploader setImage={setImage} />

        <button type="submit">更新</button>
      </form>
    </div>
  );
};

export default ProfilePage;
