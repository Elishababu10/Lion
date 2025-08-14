import React, { useState } from 'react';
import axios from 'axios';

const UploadDocument = ({ setExtractedText }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData);
      setExtractedText(res.data.text);
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadDocument;