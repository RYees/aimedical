import React from "react";
import { PolarArea, Bubble, Scatter} from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";

function PolarAreaChart(props:any) {
  const pulseData = props.pulseData;
 //console.log("cup", pulseData)
  return <PolarArea data={pulseData} />;
}

export default PolarAreaChart;