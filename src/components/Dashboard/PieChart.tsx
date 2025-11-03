import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type PieChartProps = {
  labels: string[];
  series: number[];
  title?: string;
};

const PieChart: React.FC<PieChartProps> = ({ labels, series, title }) => {
  const options: ApexOptions = {
    labels,
    legend: { position: "bottom" },
    colors: ["#FEB019", "#00E396", "#FF4560", "#775DD0", "#3F51B5"],
    title: {
      text: title,
      align: "left",
      style: { fontSize: "16px", color: "#333" },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { height: 250 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return <Chart options={options} series={series} type="donut" height={300} />;
};

export default PieChart;
