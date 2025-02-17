import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../store/authSlice";
import InputField from "../components/InputField";
import "../styles/form.css";

const NewBookPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 書籍レビューを新規投稿する関数
  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://railway.bookreview.techtrain.dev/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: data.title,
          url: data.url,
          detail: data.detail,
          review: data.review,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.ErrorMessageJP || "レビュー投稿に失敗しました");
      }

      // ローカルストレージに著者情報を保存
      const storedAuthors = JSON.parse(localStorage.getItem("book_authors")) || {};
      storedAuthors[result.id] = data.author; // 書籍IDと著者を紐づけて保存
      localStorage.setItem("book_authors", JSON.stringify(storedAuthors));

      // 投稿成功後、書籍一覧画面に遷移
      navigate("/public/books");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>書籍レビュー投稿</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField 
          label="書籍タイトル" 
          type="text" 
          name="title" 
          register={register} 
          validation={{ required: "必須項目です" }} 
          error={errors.title} 
        />
        {/* 「著者」入力欄を追加 */}
        <InputField 
          label="著者" 
          type="text" 
          name="author" 
          register={register} 
          validation={{ required: "必須項目です" }} 
          error={errors.author} 
        />
        {/* <InputField 
          label="書籍URL" 
          type="url" 
          name="url" 
          register={register} 
          validation={{ required: "必須項目です" }} 
          error={errors.url} 
        /> */}
        <InputField 
          label="詳細" 
          type="text" 
          name="detail" 
          register={register} 
          validation={{ required: "必須項目です" }} 
          error={errors.detail} 
        />
        <InputField 
          label="レビュー" 
          type="textarea" 
          name="review" 
          register={register} 
          validation={{ required: "必須項目です" }} 
          error={errors.review} 
        />

        <button type="submit">投稿</button>
      </form>
    </div>
  );
};

export default NewBookPage;
