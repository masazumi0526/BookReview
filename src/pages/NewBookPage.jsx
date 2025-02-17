import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../store/authSlice";  // 認証トークンを取得するためのReduxのセレクター
import InputField from "../components/InputField"; // 入力フィールドのコンポーネント
import "../styles/form.css";

const NewBookPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();  // react-hook-formのフックを使ってフォームを管理
  const [errorMessage, setErrorMessage] = useState("");  // エラーメッセージの状態
  const token = useSelector(selectToken);  // Reduxからログインユーザーの認証トークンを取得
  const navigate = useNavigate();  // ナビゲーションを使ってページ遷移
  const dispatch = useDispatch();  // dispatchを使ってReduxにアクションを送る

  // 書籍レビューを新規投稿する関数
  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://railway.bookreview.techtrain.dev/books", {
        method: "POST",  // POSTメソッドでデータ送信
        headers: {
          "Content-Type": "application/json",  // コンテンツタイプはJSON
          Authorization: `Bearer ${token}`,  // AuthorizationヘッダーにBearerトークンを付与
        },
        body: JSON.stringify(data),  // フォームデータをJSONに変換して送信
      });

      const result = await response.json();  // レスポンスのJSONをパース

      if (!response.ok) {
        throw new Error(result.ErrorMessageJP || "レビュー投稿に失敗しました");  // エラーメッセージの処理
      }

      // 投稿成功後、書籍一覧画面に遷移
      navigate("/public/books");
    } catch (error) {
      setErrorMessage(error.message);  // エラーメッセージを表示
    }
  };

  return (
    <div className="form-container">
      <h2>書籍レビュー投稿</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* エラーメッセージの表示 */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField 
          label="書籍タイトル" 
          type="text" 
          name="title" 
          register={register} 
          validation={{ required: "必須項目です" }} 
          error={errors.title} 
        />
        {/* 「書籍タイトル」の次に著者項目を追加 */}
        <InputField 
          label="著者" 
          type="text" 
          name="author"  // 入力フィールドのnameは「author」と設定
          register={register} 
          validation={{ required: "必須項目です" }}  // 著者は必須項目としてバリデーションを設定
          error={errors.author}  // エラーメッセージの表示
        />
        <InputField 
          label="書籍URL" 
          type="url" 
          name="url" 
          register={register} 
          validation={{ required: "必須項目です" }} 
          error={errors.url} 
        />
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
