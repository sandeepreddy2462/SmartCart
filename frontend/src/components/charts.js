// import React from 'react';
// import { Bar, Line } from 'react-chartjs-2';

// function Charts({ title, data, type }) {
//   const labels = Object.keys(data || {});
//   const values = Object.values(data || {});

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: title,
//         data: values,
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         fill: true,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//     },
//   };

//   return (
//     <div className="mb-6">
//       <h3 className="font-semibold mb-2">{title}</h3>
//       {type === 'bar' ? <Bar data={chartData} options={options} /> : <Line data={chartData} options={options} />}
//     </div>
//   );
// }

// export default Charts;
