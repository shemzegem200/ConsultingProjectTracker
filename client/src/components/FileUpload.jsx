import React, {useState} from "react";
import './FileUpload.css';

const FileUpload = ({ text, id, forwardRef}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file ? file.name : null);
    // handleChange(); //testing
  };

  const removeFile = () => {
    setSelectedFile(null);
    document.getElementById(id).value = ""; // Reset input field
  };

  return (
    <div className="file-upload-container">
      <div className="file-upload-header">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>{text}</p>
      </div>

      <label htmlFor={id} className="file-upload-footer">
        <p>{selectedFile || "No file selected"}</p>

        {selectedFile && (
          <svg
            onClick={removeFile}
            style={{ cursor: "pointer" }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
              stroke="#000000"
              strokeWidth="2"
            />
          </svg>
        )}
      </label>

      <input
        required
        ref={forwardRef}
        id={id}
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        hidden
      />
    </div>
  );
};

export default FileUpload;
