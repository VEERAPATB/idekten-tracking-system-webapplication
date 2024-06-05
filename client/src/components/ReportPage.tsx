import React from 'react'
import RadarChartPDF from './dashboard/RadarChartPDF'
import BarChartPDF from './dashboard/BarPDF'
import DataTablePDF from './dashboard/DataTablePDF'
import { useRef } from 'react'

const ReportPage = (props: { id?: number, name?: string }) => {
  return (
    <div
      className=" mx-2 items-center mt-8 bg-white rounded-[0.625rem] gap-4 flex flex-col drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] w-[1200px] "
    >
      {/* header */}
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="flex flex-col items-center gap-4">
          <span className=" mt-6 text-4xl mb-5 ">{props.name}</span>
          <div className="mb-10 border border-black w-[650px] h-[0.1px] bg-black "></div>
        </div>
      </div>
      {/* header */}

      {/* Radar/Slider */}
      <div className="radar-slider sm:items-center md:justify-stretch md:items-stretch w-5/6 flex-col flex gap-6 md:gap-2 ">
        {/* Radar/Slider */}
        <div className="radar w-full  flex flex-col justify-center rounded-t-lg drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] bg-white">
          <div className="bg-[#73408A] w-full m-0 h-auto rounded-t-lg flex justify-center " >
            <p className="text-white text-lg p-[0.3rem] " style={{ marginBottom: "10px" }}>RADAR CHART</p>
          </div>
          <div className="radar-component ">
            <RadarChartPDF id={props.id} />
          </div>
          <div className="slider flex justify-center text-4xl text-[#73408A] mb-6">
            Level&nbsp; {props.id}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="Bar flex flex-col w-full  rounded-t-lg drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] bg-white">
          <div className="bg-[#73408A] w-full h-auto rounded-t-lg flex justify-center">
            <p className="text-white text-lg p-[0.3rem] " style={{ marginBottom: "10px" }}>BAR CHART</p>
          </div>
          <div className="Bar-component overflow-x-auto h-full">
            <BarChartPDF id={props.id} />
          </div>
        </div>
        {/* Bar Chart */}
      </div>
      {/* Radar/Slider */}

      {/* Table */}
      <div className="Table w-5/6 sm:w-4/5 md:w-5/6 justify-center bg-white ">
        <div className="sm:m-[8.5px] md:m-0">
          <DataTablePDF id={props.id} />
        </div>
      </div>
      {/* Table */}
    </div>
  )
}

export default ReportPage