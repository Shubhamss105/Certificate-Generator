import React, { useState } from 'react';
import axios from 'axios';

const UploadCsv = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://localhost:5000/api/certificates/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
};

export default UploadCsv;
