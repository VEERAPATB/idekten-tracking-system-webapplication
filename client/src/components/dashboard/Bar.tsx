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
      backgroundColor = "#73408A";
      borderColor = "#73408A";
    } else if (index === 1) {
      backgroundColor = "#A17FB1";
      borderColor = "#A17FB1";
    } else if (index === 2) {
      backgroundColor = "#0096FF";
      borderColor = "#0096FF";
    } else if (index === 3) {
      backgroundColor = "#D29F48";
      borderColor = "#D29F48";
    } else if (index === 4) {
      backgroundColor = "#F1E1C6";
      borderColor = "#F1E1C6";
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
      borderRadius: 10,
      categoryPercentage: 0.4,
      pointStyle: "rectRounded",
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
        stacked: true,
      },
      y: {
        stacked: true,
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

  return <Bar className="w-5/6" options={options} data={data} />;
};

export default BarChart;
