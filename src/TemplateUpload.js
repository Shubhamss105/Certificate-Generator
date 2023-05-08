import React, { useState } from "react";
import axios from "axios";

const TemplateUpload = () => {
  const [template, setTemplate] = useState(null);
  const [message, setMessage] = useState("");

  const handleTemplateChange = (event) => {
    setTemplate(event.target.files[0]);
  };

  const handleTemplateUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("template", template);
      await axios.post("http://localhost:5000/api/templates/upload", formData);
      setMessage("Template uploaded successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Error uploading template.");
    }
  };

  return (
    <div>
      <h1>Template Upload</h1>
      <input type="file" onChange={handleTemplateChange} />
      <button onClick={handleTemplateUpload}>Upload Template</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TemplateUpload;
