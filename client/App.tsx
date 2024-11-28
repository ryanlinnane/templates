import { useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import './App.css'
import React from 'react';

const stockData = [
  { date: "2023-11-01", price: 162.00 },
  { date: "2023-12-01", price: 170.50 },
  { date: "2024-01-01", price: 175.30 },
  { date: "2024-02-01", price: 180.40 },
  { date: "2024-03-01", price: 185.25 },
  { date: "2024-04-01", price: 190.10 },
  { date: "2024-05-01", price: 195.00 },
  { date: "2024-06-01", price: 200.75 },
  { date: "2024-07-01", price: 210.40 },
  { date: "2024-08-01", price: 220.30 },
  { date: "2024-09-01", price: 225.80 },
  { date: "2024-10-01", price: 230.90 },
  { date: "2024-11-01", price: 234.92 },
];

const StockChart = () => {
  const options = {
    chart: {
      type: "line",
      backgroundColor: "#1d1f22", // Dark background color
      height: 400,
    },
    title: {
      text: "Apple",
      style: {
        color: "#ffffff",
        fontSize: "18px",
      },
    },
    subtitle: {
      text: "Past year",
      style: {
        color: "#9c9c9c",
        fontSize: "14px",
      },
    },
    xAxis: {
      categories: stockData.map((data) => data.date),
      labels: {
        style: {
          color: "#cccccc",
        },
      },
    },
    yAxis: {
      title: {
        text: null, // Hides the Y-axis title
      },
      gridLineColor: "#444444",
      labels: {
        enabled: false, // Hides the Y-axis price labels
      },
    },
    series: [
      {
        name: "Price",
        data: stockData.map((data) => data.price),
        color: "#00ff00",
        marker: {
          enabled: true,
          radius: 5,
          fillColor: "#ffcc00",
        },
      },
    ],
    legend: {
      enabled: false, // Hides the legend
    },
    tooltip: {
      backgroundColor: "#333333",
      borderColor: "#ffffff",
      style: {
        color: "#ffffff",
      },
      formatter: function () {
        return `<b>${this.x}</b><br>Price: $${this.y}`;
      },
    },
    credits: {
      enabled: false, // Hides the Highcharts credit
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0)
  return (
    <ul>
      <li>hello</li>
      <li>this is a test</li>
      {/* <StockChart /> */}
    </ul>
  )
}

export default App
