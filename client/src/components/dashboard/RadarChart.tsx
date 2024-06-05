// RadarChart.tsx
"use client";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadarController,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  RadialLinearScale,
  Title,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

const RadarChart = (prop: {id?:number}) => {
  const [Data, setData] = useState<{ skill: string[], point: string[], max: number}>()

  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const handleClick = async () => {
      try {
        const result = await axiosAuth.get(`/api/radar-chart/${prop.id}`);
        console.log(result.data);
        setData({
          ...Data,
          skill: result.data.skill,
          point: result.data.point,
          max: result.data.max,
          
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleClick();
  }, [prop.id]);

  ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    RadarController,
    LineController,
    Title,
    RadialLinearScale,
    Filler,
    Tooltip
  );

  const backend = {
    curr_lv: 4,
    skill: Data?.skill,
    point: Data?.point,
    max: Data?.max,
  };
  
  const data = {
    labels: backend.skill,
    datasets: [
      {
        data: backend.point,
        backgroundColor: "#9787FF80",
        borderColor: "#9787FF",
        pointBackgroundColor: "#9787FF",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#9787FF",
      },
    ],
  };
  const options = {
    layout: {
      padding: {
        left: 10, // Adjust as needed
        right: 10, // Adjust as needed
        top: 10, // Adjust as needed
        bottom: 10 // Adjust as needed
      }
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: "#73408A",
        },
        grid: {
          color: "#73408A",
        },
        pointLabels: {
          color: "black",
          font: {
            size: 10,
          },
        },
        ticks: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: backend.max,
      },
    },
  };

  return <Chart className="w-5/6 " type="radar" data={data} options={options} />;
};

export default RadarChart;
