import React from 'react';
import './Dashboard.css';

function Dashboard({ insights }) {
  const cellStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  textAlign: 'center'
};
  const API_URL = process.env.VITE_API_URL;


return (
    <div className="p-4">
      <h2>Dashboard</h2>
      <p>Welcome to the Market Insight Dashboard! Here you can view insights derived from your uploaded market data.</p>
      <p>Use the upload feature to process your market data and generate insights.</p>

      {insights?.columns && (
        <div>
          <h3 style={{ marginBottom: '10px' }}>Columns</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {Object.entries(insights.columns).map(([count, item], idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>
                {count}: {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {insights?.sales_chart_url && (
        <div className="chart-container">
          <h3>Sales Trend Over Time</h3>
          <img 
            src={`http://localhost:5000/${insights.sales_chart_url}`} 
            alt="Sales Trend" 
            className="chart-image" 
          />
        </div>
      )}

      


      {insights?.top_products && (
        <div>
          <h3>Top 10 Products</h3>
          <ul>
            {Object.entries(insights.top_products).map(([item, count], idx) => (
              <li key={idx}>{item}: {count} sales</li>
            ))}
          </ul>
        </div>
      )}

      {insights?.sales_over_time && (
        <div>
          <h3>Monthly Sales Summary</h3>
          <ul>
            {Object.entries(insights.sales_over_time).map(([date, qty], idx) => (
              <li key={idx}>{date}: {qty} items sold</li>
            ))}
          </ul>
        </div>
      )}

      {insights?.transaction_summary && (
        <div>
          <h3>Transaction Size Summary</h3>
          <ul>
            {Object.entries(insights.transaction_summary).map(([stat, value], idx) => (
              <li key={idx}>{stat}: {value.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}

      {insights?.recommendations && (
        <div>
          <h3>🛒 Interesting Purchase Patterns</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={cellStyle}>If Bought</th>
                <th style={cellStyle}>Then Likely</th>
                <th style={cellStyle}>Confidence</th>
                <th style={cellStyle}>Lift</th>
              </tr>
            </thead>
            <tbody>
              {insights?.recommendations.map((rule, idx) => (
                <tr key={idx}>
                  <td style={cellStyle}>{rule.antecedents.join(', ')}</td>
                  <td style={cellStyle}>{rule.consequents.join(', ')}</td>
                  <td style={cellStyle}>{(rule.confidence * 100).toFixed(1)}%</td>
                  <td style={cellStyle}>{rule.lift.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

    </div>
  );
}

export default Dashboard;
