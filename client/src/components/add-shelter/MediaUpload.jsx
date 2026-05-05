// components/MediaUpload.jsx
import { useState, useRef } from "react";

export default function MediaUpload({ files, onFilesChange }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);

  const addFiles = (incoming) => {
    const names = [...files, ...Array.from(incoming).map((f) => f.name)];
    onFilesChange(names);
  };

  const removeFile = (index) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-title">
          <span className="section-icon">🖼</span>
          Media
        </div>
        <p className="section-desc">Upload logos or facility images.</p>
      </div>

      {/* Drop zone */}
      <div
        className={`upload-zone${drag ? " dragover" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          addFiles(e.dataTransfer.files);
        }}
      >
        <div className="upload-icon-wrap">☁️</div>
        <p className="upload-text">
          <span>Click to upload</span> or drag and drop
        </p>
        <p className="upload-hint">SVG, PNG, JPG or GIF (MAX. 800×400px)</p>

        <input
          ref={inputRef}
          type="file"
          className="upload-input"
          accept="image/*"
          multiple
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Previews */}
      {files.length > 0 && (
        <div className="uploaded-list">
          {files.map((name, i) => (
            <div key={i} className="uploaded-chip">
              <span>🖼</span>
              <span>{name}</span>
              <button type="button" onClick={() => removeFile(i)}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Admin notes */}
      <div style={{ marginTop: 20 }}>
        <label className="field-label">Internal Admin Notes</label>
        <textarea
          className="field-textarea field-last"
          placeholder="Private notes not visible to public…"
          rows={3}
        />
      </div>
    </div>
  );
}
