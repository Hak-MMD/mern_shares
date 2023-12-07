// LineChart.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, Title } from 'chart.js';

Chart.register(LinearScale, CategoryScale, PointElement, LineElement, Title);

const LineChart = ({ dataArr, dateArr }) => {

  console.log('here', dataArr, dateArr);
  const [popupContent, setPopupContent] = useState('');
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupVisible, setPopupVisible] = useState(false);

  const data = {
    labels: dateArr,
    datasets: [
      {
        label: 'Sales Chart',
        data: dataArr,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointRadius: 7,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        type: 'linear',
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Sales Chart',
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: 'xy',
    },
    onHover: (event, elements) => {
      if (elements.length) {
        const xValue = data.labels[elements[0].index]
        const value = data.datasets[elements[0].datasetIndex].data[elements[0].index];
        const rightSpace = window.innerWidth - event.x;
        const popupWidth = 200;
        if (rightSpace >= popupWidth) {
          // Display the popup to the right
          setPopupPosition({ x: event.x, y: event.y });
        } else {
          // Display the popup to the left
          setPopupPosition({ x: event.x - popupWidth, y: event.y });
        }
        setPopupContent(`Value: ${value} <br /> Time: ${xValue}`);
        setPopupPosition({ x: event.x, y: event.y });
        setPopupVisible(true); // Show the popup
      } else {
        setPopupVisible(false); // Hide the popup
      }
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      <Line data={data} options={options} />
      {popupVisible && (
        <div
          className="custom-popup"
          style={{
            position: 'absolute',
            left: popupPosition.x + -90 + 'px',
            top: popupPosition.y + 20 + 'px',
            background: '#ffffff',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 100,
          }}
        >
           <div dangerouslySetInnerHTML={{ __html: popupContent }} />
        </div>
      )}
    </div>
  );
};

export default LineChart;
