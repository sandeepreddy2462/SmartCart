// import React, { useState } from 'react';
// import axios from 'axios';
// import './UploadData.css';

// function UploadData({ setInsights }) {
//   const [file, setFile] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [recommendations, setRecommendations] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [recommending, setRecommending] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setRecommendations([]); // reset previous state
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Please choose a file first.");
//     const formData = new FormData();
//     formData.append('file', file);
//     setUploading(true);

//     try {
//       const res = await axios.post('http://localhost:5000/upload', formData);
//       console.log("Insights:", res.data);
//       setInsights(res.data);
//       alert('✅ File uploaded and processed successfully.');
//     } catch (err) {
//       console.error("Upload error:", err.response?.data || err.message);
//       alert('❌ Failed to upload or process file.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleRecommend = async () => {
//     if (selectedItems.length === 0) return alert("Enter at least one item.");
//     setRecommending(true);

//     try {
//       const res = await axios.post('http://localhost:5000/recommend', {
//         items: selectedItems
//       }, {
//         headers: { 'Content-Type': 'application/json' }
//       });
//       setRecommendations(res.data.recommended_items);
//     } catch (err) {
//       console.error("Recommendation error:", err.response?.data || err.message);
//       alert('❌ Failed to get recommendations.');
//     } finally {
//       setRecommending(false);
//     }
//   };

//   return (
//     <div className="upload-container">
//       <h2>📤 Upload Market Data</h2>

//       <input type="file" accept=".xlsx, .csv" onChange={handleFileChange} />

//       <button
//         className="btn"
//         onClick={handleUpload}
//         disabled={uploading}
//       >
//         {uploading ? "Uploading..." : "Upload Data"}
//       </button>

//       <div className="selector">
//         <label>Select Items for Recommendation:</label>
//         <input
//           type="text"
//           placeholder="e.g. item1, item2"
//           onChange={(e) => setSelectedItems(e.target.value.split(',').map(s => s.trim()))}
//         />
//         <button
//           className="btn recommend"
//           onClick={handleRecommend}
//           disabled={recommending}
//         >
//           {recommending ? "Generating..." : "Get Recommendations"}
//         </button>
//       </div>

//       {recommendations.length > 0 && (
//         <div className="recommendations">
//           <h3>🛍️ Recommended Products:</h3>
//           <ul>
//             {recommendations.map((item, idx) => <li key={idx}>{item}</li>)}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadData;






import React, { useState } from 'react';
import axios from 'axios';
import './UploadData.css';

function UploadData({ setInsights }) {
  const [file, setFile] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [recommending, setRecommending] = useState(false);
  const API_URL = process.env.VITE_API_URL;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setRecommendations([]); // reset previous state
  };

  const handleUpload = async () => {
    if (!file) return alert("Please choose a file first.");
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const res = await axios.post(`${API_URL}/upload`, formData);
      console.log("Insights:", res.data);
      setInsights(res.data);
      alert('✅ File uploaded and processed successfully.');
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert('❌ Failed to upload or process file.');
    } finally {
      setUploading(false);
    }
  };

  const handleRecommend = async () => {
    if (selectedItems.length === 0) return alert("Enter at least one item.");
    setRecommending(true);

    try {
      const res = await axios.post(`${API_URL}/recommend`, {
        items: selectedItems
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setRecommendations(res.data.recommended_items);
    } catch (err) {
      console.error("Recommendation error:", err.response?.data || err.message);
      alert('❌ Failed to get recommendations.');
    } finally {
      setRecommending(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>📤 Upload Market Data</h2>

      <input type="file" accept=".xlsx, .csv" onChange={handleFileChange} />

      <button
        className="btn"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Data"}
      </button>

      <div className="selector">
        <label>Select Items for Recommendation:</label>
        <input
          type="text"
          placeholder="e.g. item1, item2"
          onChange={(e) => setSelectedItems(e.target.value.split(',').map(s => s.trim()))}
        />
        <button
          className="btn recommend"
          onClick={handleRecommend}
          disabled={recommending}
        >
          {recommending ? "Generating..." : "Get Recommendations"}
        </button>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h3>🛍️ Recommended Products:</h3>
          <ul>
            {recommendations.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadData;
