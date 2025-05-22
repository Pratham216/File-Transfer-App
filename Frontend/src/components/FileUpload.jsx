import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { QRCodeCanvas } from "qrcode.react";
import "../App.css";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const ngrokUrl = import.meta.env.VITE_NGROK_URL;

  const handleUpload = () => {
    if (files.length === 0) return alert("Please select files!");

    setIsLoading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${ngrokUrl}/upload`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress);
      }
    };

    xhr.onload = async () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        setDownloadUrl(data.downloadUrl);
        setUploadProgress(100);
        setIsLoading(false);
      } else {
        console.error("Upload failed", xhr.responseText);
      }
    };

    xhr.onerror = () => {
      console.error("Error uploading files");
      setIsLoading(false);
    };

    xhr.send(formData);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    multiple: true,
  });

  return (
    <div className="upload-container">
      <h2>Upload your file</h2>

      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #007bff",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag & Drop your files here, or click to select files</p>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          <h4>Selected Files:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleUpload} className="upload-button">
        {isLoading ? "Uploading..." : "Upload"}
      </button>

      {uploadProgress > 0 && (
        <div className="progress-bar-container">
          <progress value={uploadProgress} max="100"></progress>
          <span>{Math.round(uploadProgress)}%</span>
        </div>
      )}

      {downloadUrl && !isLoading && (
        <div className="download-section">
          <p>File uploaded successfully!</p>
          <p>Share this link to allow others to download the file:</p>
          <p>
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
              {downloadUrl}
            </a>
          </p>
          <p>Or scan the QR code to download:</p>
          <QRCodeCanvas
            value={downloadUrl}
            size={200} // Increased size
            level="H" // High error correction level
            style={{ padding: "10px", background: "#fff" }} // Adds padding and white background
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
