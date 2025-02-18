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
  const reduxUser = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(reduxUser); // 🔹 ユーザー情報を useState で管理
  const [image, setImage] = useState(reduxUser?.iconUrl || null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // 🔹 API からユーザー情報を取得し、Redux と state を更新
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://railway.bookreview.techtrain.dev/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("ユーザー情報の取得に失敗しました");
        }

        const fetchedUser = await response.json();
        setUserData(fetchedUser);
        setImage(fetchedUser.iconUrl || null);
        dispatch(login({ user: fetchedUser, token })); // Redux も更新
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    if (!reduxUser && token) {
      fetchUser();
    }
  }, [reduxUser, token, dispatch]);

  // 🔹 ユーザー情報が取得できたらフォームに反映
  useEffect(() => {
    if (userData) {
      setValue("username", userData.name || "");
      setValue("email", userData.email || "");
      setValue("password", "********");
    }
  }, [userData, setValue]);

  const uploadIcon = async (file) => {
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
      let updatedIconUrl = image;

      if (image && image !== userData?.iconUrl) {
        updatedIconUrl = await uploadIcon(image);
      }

      const requestBody = {
        name: data.username,
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
      setUserData(updatedUser); // 🔹 `useState` の `userData` を更新
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

        <ImageUploader setImage={setImage} initialImage={image} />

        <button type="submit">更新</button>
      </form>
    </div>
  );
};

export default ProfilePage;
