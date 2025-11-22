import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { QRCodeCanvas } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  // Use IPv4 address or fallback to environment variable
  const ngrokUrl = import.meta.env.VITE_NGROK_URL || 'http://10.213.69.178:5000';

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
        setIsLoading(false);
      }
    };

    xhr.onerror = () => {
      console.error("Error uploading files");
      setIsLoading(false);
    };

    xhr.send(formData);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileChange,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    multiple: true,
  });

  const handleReset = () => {
    setFiles([]);
    setDownloadUrl("");
    setUploadProgress(0);
    setIsLoading(false);
  };

  return (
    <motion.div 
      className="upload-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="upload-header">
        <motion.h2 
          className="upload-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Share Files Instantly
        </motion.h2>
        <motion.p 
          className="upload-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Upload your files and share them with anyone, anywhere
        </motion.p>
      </div>

      <motion.div
        {...getRootProps()}
        className={`dropzone ${isDragActive || isDragging ? 'active' : ''} ${files.length > 0 ? 'has-files' : ''}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <div className="dropzone-content">
          <motion.div
            className="dropzone-icon"
            animate={{ 
              rotate: isDragActive ? 360 : 0,
              scale: isDragActive ? 1.1 : 1 
            }}
            transition={{ duration: 0.5 }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <p className="dropzone-text">
            {isDragActive 
              ? "Drop your files here!" 
              : files.length > 0 
                ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
                : "Drag & drop files here or click to browse"}
          </p>
          {!files.length && (
            <p className="dropzone-hint">Supports multiple files (max 50MB each)</p>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div 
            className="file-list"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="file-list-header">
              <h3>Selected Files</h3>
              <button onClick={handleReset} className="clear-button" aria-label="Clear files">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="file-items">
              {files.map((file, index) => (
                <motion.div 
                  key={index} 
                  className="file-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="file-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="file-info">
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">{formatFileSize(file.size)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {files.length > 0 && !downloadUrl && (
        <motion.button 
          onClick={handleUpload} 
          className="upload-button"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Uploading...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload Files
            </>
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <motion.div 
            className="progress-bar-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="progress-bar-wrapper">
              <motion.div 
                className="progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="progress-text">{Math.round(uploadProgress)}%</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {downloadUrl && !isLoading && (
          <motion.div 
            className="download-section"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <h3 className="success-title">Upload Successful!</h3>
            <p className="success-message">Share this link with anyone to download your files</p>
            
            <div className="download-link-container">
              <input 
                type="text" 
                value={downloadUrl} 
                readOnly 
                className="download-link-input"
                onClick={(e) => e.target.select()}
              />
              <motion.button
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(downloadUrl);
                  alert('Link copied to clipboard!');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Copy link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5.00005C7.01165 5.00005 6.49359 5.00005 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.49359 5 7.01165 5 8.00005V16C5 16.9884 5 17.5065 5.21799 17.908C5.40973 18.2843 5.71569 18.5903 6.09202 18.782C6.49359 19 7.01165 19 8 19H16C16.9884 19 17.5065 19 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C19 17.5065 19 16.9884 19 16V8.00005C19 7.01165 19 6.49359 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5065 5.00005 16.9884 5.00005 16 5.00005H8Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 3C9 2.05719 9 1.58579 9.29289 1.29289C9.58579 1 10.0572 1 11 1H13C13.9428 1 14.4142 1 14.7071 1.29289C15 1.58579 15 2.05719 15 3V5H9V3Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </motion.button>
              <motion.a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="open-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Open link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15 3H21M21 3V9M21 3L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </div>

            <div className="qr-section">
              <p className="qr-label">Or scan this QR code</p>
              <motion.div
                className="qr-container"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              >
                <QRCodeCanvas
                  value={downloadUrl}
                  size={200}
                  level="H"
                  className="qr-code"
                />
              </motion.div>
            </div>

            <motion.button
              onClick={handleReset}
              className="reset-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Upload New Files
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FileUpload;
