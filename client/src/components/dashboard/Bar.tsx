// RadarChart.tsx
"use client";

import React, { useEffect, useState } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const BarChart = (prop: { id?: number }) => {
  const [Data, setData] = useState<{
    week: string[];
    topic: string[];
    maxFields: number | 0;
    clause: string[];
    Answers: string[];
  }>({
    week: [],
    topic: [],
    maxFields: 0,
    clause: [],
    Answers: [],
  });

  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const handleClick = async () => {
      try {
        const result = await axiosAuth.get(`/api/bar-chart/${prop.id}`);
        console.log(result.data);
        setData({
          ...Data,
          week: result.data.week,
          topic: result.data.topic,
          maxFields: result.data.maxFields,
          clause: result.data.clause,
          Answers: result.data.Answers,
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleClick();
  }, [prop.id]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const datasets = Data.clause.map((clause, index) => {
    let backgroundColor: string, borderColor: string;
    if (index === 0) {
      backgroundColor = "#F4AB33";
      borderColor = "#F4AB33";
    } else if (index === 1) {
      backgroundColor = "#EC7176";
      borderColor = "#EC7176";
    } else if (index === 2) {
      backgroundColor = "#C068A8";
      borderColor = "#C068A8";
    } else if (index === 3) {
      backgroundColor = "#5C63A2";
      borderColor = "#5C63A2";
    } else if (index === 4) {
      backgroundColor = "#1B4E6B";
      borderColor = "#1B4E6B";
    } else {
      // Handle additional clauses or assign default colors
      backgroundColor = "#126549";
      borderColor = "#126549";
    }
    
    return {
      label: clause,
      data: Data.Answers[index],
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1,
      borderRadius: 3,
      categoryPercentage: 0.4,
      pointStyle: "rectRounded",
      barThickness: 11 // Change the bar width here
    };
  });
  

  const data = {
    labels: Data.topic,
    datasets: datasets,
  };
  const options:any  = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        align: "end",
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        grid: {
          color: "#73408A", // Change the color of the Y-axis grid lines
        },
        ticks: {
          color: "black", // Change the color of the Y-axis tick marks
        },
        border: {
          color: "#73408A", // Change the color of left axis Y
        },
      },
    },
  };

  return <Bar className="min-w-max lg:w-full " options={options} data={data} />;
};

export default BarChart;
