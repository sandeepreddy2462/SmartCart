import React, { useState } from 'react';
import UploadData from './components/UploadData';
import Dashboard from './components/Dashboard';

function App() {
  const [insights, setInsights] = useState(null);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">Market Insight Dashboard</h1>
      <UploadData setInsights={setInsights} />
      <Dashboard insights={insights} />
    </div>
  );
}

export default App;