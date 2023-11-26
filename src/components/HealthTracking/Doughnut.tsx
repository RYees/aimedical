import {Doughnut} from 'react-chartjs-2';
import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

function DoughnutChart(props:any ) {
  const data = props.data;
  Chart.register(CategoryScale);
  return <Doughnut data={data} />;
}

export default DoughnutChart;