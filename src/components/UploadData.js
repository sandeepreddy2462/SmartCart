import React, { useState } from 'react';
import axios from 'axios';
import './UploadData.css'; // for custom styles

function UploadData({ setInsights }) {
  const [file, setFile] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
  const res = await axios.post('http://localhost:5000/upload', formData);
  console.log("Insights:", res.data);
  setInsights(res.data);
  alert('File uploaded successfully.');
} catch (err) {
  console.error("Upload error:", err.response?.data || err.message);
  alert('Failed to upload or process file.');
}

  };

  const handleRecommend = async () => {
    const formData = new FormData();
    formData.append('file', file);
    const fileBlob = file;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const res = await axios.post('http://localhost:5000/recommend', {
          items: selectedItems
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        setRecommendations(res.data.recommended_items);
      } catch {
        alert('Failed to get recommendations.');
      }
    };
    reader.readAsArrayBuffer(fileBlob);
  };

  return (
    <div className="upload-container">
      <input type="file" accept=".xlsx, .csv" onChange={handleFileChange} />
      <button className="btn" onClick={handleUpload}>Upload Data</button>
      
      <div className="selector">
        <label>Select Items for Recommendation:</label>
        <input
          type="text"
          placeholder="Comma separated items..."
          onChange={(e) => setSelectedItems(e.target.value.split(',').map(s => s.trim()))}
        />
        <button className="btn recommend" onClick={handleRecommend}>Get Recommendations</button>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h3>Recommended Products:</h3>
          <ul>
            {recommendations.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadData;
