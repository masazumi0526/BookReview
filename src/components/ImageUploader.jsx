import Compressor from "compressorjs";
import { useState } from "react";

const ImageUploader = ({ setImage }) => {
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージを追加

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // 画像の拡張子チェック（jpg, png のみ許可）
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("JPGまたはPNG形式の画像を選択してください");
      return;
    }

    // ファイルサイズチェック（1MB以下）
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      setErrorMessage("画像サイズは1MB以下にしてください");
      return;
    }

    setErrorMessage(""); // エラーをクリア

    // 画像を圧縮
    new Compressor(file, {
      quality: 0.6,
      success: (compressedFile) => {
        setImage(compressedFile); // 親コンポーネントにセット
        setPreview(URL.createObjectURL(compressedFile)); // プレビューをセット
      },
    });
  };

  return (
    <div className="image-uploader">
      <label>プロフィール画像</label>
      <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} />
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* エラーメッセージ表示 */}
      {preview && <img src={preview} alt="preview" className="preview-image" />}
    </div>
  );
};

export default ImageUploader;
