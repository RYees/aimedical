import React from "react";
import { Chart, CategoryScale, LineController, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Chart as ChartJS } from 'react-chartjs-2';

Chart.register(CategoryScale, LineController, PointElement, LinearScale, Title, Tooltip, Legend);

const AreaChart = (props:any) => {
  const chartData = props.chartData;

  return <ChartJS type="line" data={chartData} />;
}

export default AreaChart;