import React from 'react';
import './Dashboard.css';

function Dashboard({ insights }) {
  return (
    <div className="p-4">
      <h2>Dashboard</h2>

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
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {insights.recommendations.map((rule, idx) => (
              <li key={idx} style={{ marginBottom: '12px', padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
                <p>
                  <strong>If bought:</strong> {rule.antecedents.join(', ')}<br />
                  <strong>Then likely:</strong> {rule.consequents.join(', ')}<br />
                  <strong>Confidence:</strong> {rule.confidence.toFixed(2)} | <strong>Lift:</strong> {rule.lift.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
