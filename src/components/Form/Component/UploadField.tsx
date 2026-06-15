import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import "./UploadField.css";

type Props = {
  name: string;
  required?: boolean;
  maxItems?: number;
  fileTypeExcept?: string[];
  rules?: any;
  removeDelete?: boolean;
  label: string;
  avtarSize?: number;
};

const CLOUD_NAME = "djw5fw1xp";
const UPLOAD_PRESET = "qt3inmkp";

const UploadField: React.FC<Props> = ({
  name,
  required = false,
  maxItems = 1,
  fileTypeExcept = [],
  rules = {},
  label,
  avtarSize = 100,
}) => {
  const { control } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? "This field is required" : false,
        ...rules,
      }}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => {
        // 🔥 Upload to Cloudinary
        const handleUpload = async (file: File) => {
          try {
            if (fileTypeExcept.length && !fileTypeExcept.includes(file.type)) {
              alert("Invalid file type");
              return;
            }

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", UPLOAD_PRESET);

            const res = await fetch(
              `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
              {
                method: "POST",
                body: formData,
              },
            );

            const data = await res.json();

            // store URL
            onChange([...value, data.secure_url]);
          } catch (err) {
            console.error("Upload error:", err);
          }
        };

        // ❌ Delete (Cloudinary frontend cannot delete securely)
        const handleRemove = (url: string) => {
          const updated = value.filter((item: string) => item !== url);
          onChange(updated);
        };

        return (
          <div className="upload-container">
            {label && (
              <label className="input-label">
                {label}
                {required && <span className="required">*</span>}
              </label>
            )}
            {/* Uploaded Images */}
            <div className="upload-grid">
              {value.map((url: string, index: number) => (
                <div
                  className="upload-card"
                  key={index}
                  style={{ width: `${avtarSize}px`, height: `${avtarSize}px` }}
                >
                  <img
                    src={url}
                    alt="preview"
                    onClick={() => setPreview(url)}
                  />

                  <div className="overlay">
                    <button type="button" onClick={() => setPreview(url)}>
                      View
                    </button>
                    <button type="button" onClick={() => handleRemove(url)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload Button */}
              {value.length < maxItems && (
                <label className="upload-box">
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <span>+ Upload</span>
                </label>
              )}
            </div>

            {/* Error */}
            {error && <p className="error">{error.message}</p>}

            {/* Preview Modal */}
            {preview && (
              <div className="preview-overlay" onClick={() => setPreview(null)}>
                <div
                  className="preview-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="close-btn"
                    onClick={() => setPreview(null)}
                  >
                    ✕
                  </button>

                  <img src={preview} alt="preview" />
                </div>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default UploadField;
