import Compressor from "compressorjs";
import { useState } from "react";

const ImageUploader = ({ setImage }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        success: (compressedFile) => {
          setImage(compressedFile);
          setPreview(URL.createObjectURL(compressedFile));
        },
      });
    }
  };

  return (
    <div className="image-uploader">
      <label>プロフィール画像</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="preview" className="preview-image" />}
    </div>
  );
};

export default ImageUploader;
