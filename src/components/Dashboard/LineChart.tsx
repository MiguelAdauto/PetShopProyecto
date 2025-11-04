import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type LineChartProps = {
  categories: string[];
  series: { name: string; data: number[] }[];
  title?: string;
};

const LineChart: React.FC<LineChartProps> = ({ categories, series, title }) => {
  const options: ApexOptions = {
    chart: { id: "line-chart" },
    xaxis: { categories },
    stroke: { curve: "smooth" },
    colors: ["#4143BE"],
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
          xaxis: { labels: { rotate: -45 } },
        },
      },
    ],
  };

  return <Chart options={options} series={series} type="line" height={300} />;
};

export default LineChart;
