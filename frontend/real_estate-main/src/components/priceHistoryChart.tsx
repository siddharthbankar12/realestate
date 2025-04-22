import React, { useEffect, useRef } from 'react';
import styles from '../components/priceHistoryChart.module.css';
import Chart from 'chart.js/auto';
import priceHistory from './priceHistory';
import { format } from 'date-fns'; // Import date formatting function

const PriceHistoryChart = () => {
  const chartRef = useRef(null); // Create a reference to the canvas element

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d'); // Get the 2D context of the canvas

    // Prepare the data
    const labels = priceHistory.map(entry => entry.date);
    const data = priceHistory.map(entry => entry.price);

    // Create the chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // Hide the legend
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            },
            ticks: {
              callback: (value) => {
                // Format the date in 'Jan'25' format
                const date = new Date(value);
                return format(date, "MMM''yy");
              },
              maxRotation: 90, // Rotate labels 90 degrees
              minRotation: 90
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price (Rs.)'
            },
            beginAtZero: true
          }
        }
      }
    });

    // Clean up the chart when the component is unmounted
    return () => {
      if (chartRef.current) {
        const chartInstance = Chart.getChart(chartRef.current);
        if (chartInstance) {
          chartInstance.destroy();
        }
      }
    };
  }, []);

  return (
    <div className={styles.chart}>
      <canvas ref={chartRef}></canvas> 
    </div>
  );
};

export default PriceHistoryChart;
