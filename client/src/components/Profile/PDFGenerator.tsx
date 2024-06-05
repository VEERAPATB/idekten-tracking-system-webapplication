// PDFGenerator.tsx
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import RadarChart from "../dashboard/RadarChart";
import Image from "next/image";
import DiscreteSliderArray from "../dashboard/DiscreteSliderArray";
import BarChart from "../dashboard/Bar";
import DataTable from "../dashboard/DataTable";
const PDFGenerator = ({ data }: { data: number }) => {
  const pdfid = document.getElementById("pdf-content")
  const axiosAuth = useAxiosAuth();
  const [DataDisplay, setDataDisplay] = useState<{
    skill: string[];
    point: string[];
    max: number;
  }>();

  useEffect(() => {
    const handleClick = async () => {
      try {
        const result = await axiosAuth.get(`/api/radar-chart/${data}`);
        console.log(result.data);
        setDataDisplay({
          ...DataDisplay,
          skill: result.data.skill,
          point: result.data.point,
          max: result.data.max,
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleClick();
  }, [data]);

  const downloadPDF = () => {
    const input = pdfid;

    if (!input) {
      console.error("PDF container not found");
      return;
    }

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };
  
  return (
    <div>
      <div className="bg-[#5D5D5D] text-[#FFFFFF] opacity-50 relative -z-10">
        <p className=" pl-[1.5rem] pt-[0.313rem] pb-[0.188rem] lg:text-xl lg:pl-[7.813rem]">
          ภาพรวม
        </p>
      </div>
      <div
        className=" mx-2 items-center mt-8 bg-white rounded-[0.625rem] gap-4 flex flex-col drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] "
      >
        {/* header */}
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="flex flex-col items-center gap-4">
            <span className=" mt-6 lg:text-2xl ">{data}</span>
            <div className="border border-black w-[300px] sm:w-[400px] md:w-[500px] lg:w-[650px] h-[0.1px] bg-black "></div>
          </div>
          {/* <button className="bg-[#73408A] rounded-xl p-3 text-white" onClick={downloadPDF}>
            Export PDF
          </button> */}
        </div>
        {/* header */}

        {/* Radar/Slider */}
        <div className="radar-slider sm:items-center md:justify-stretch md:items-stretch w-5/6 flex-col flex gap-6 md:flex-row md:gap-2 ">
          {/* Radar/Slider */}
          <div className="radar w-full sm:w-11/12 md:w-3/6 flex flex-col justify-center rounded-t-lg drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] bg-white">
            <div className="bg-[#73408A] w-full m-0 h-auto rounded-t-lg flex justify-center">
              <p className="text-white text-lg p-[0.3rem]">RADAR CHART</p>
              <button
                className="absolute p-2 w-12 h-12 top-[-5px] right-0 cursor-pointer "
              >
                <Image
                  alt=""
                  src="/images/I-icon.svg"
                  objectFit="cover"
                  width={32}
                  height={32}
                  className=" rounded-full overflow-hidden "
                />
              </button>
            </div>
            <div className="radar-component ">
              <RadarChart id={data} />
            </div>
            {/* <div className="slider flex justify-center ">
              <DiscreteSliderArray
                id={data}
                change={(e) => {
                  setParamid({ id: e });
                  createPageURL(e);
                }}
              />
            </div> */}
          </div>

          {/* Bar Chart */}
          <div className="Bar flex flex-col w-full sm:w-11/12 md:w-3/6 rounded-t-lg drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] bg-white">
            <div className="bg-[#73408A] w-full h-auto rounded-t-lg flex justify-center">
              <p className="text-white text-lg p-[0.3rem]">BAR CHART</p>
            </div>
            <div className="Bar-component overflow-x-auto h-full">
              <BarChart id={data} />
            </div>
          </div>
          {/* Bar Chart */}
        </div>
        {/* Radar/Slider */}

        {/* Table */}
        <div className="Table w-5/6 sm:w-4/5 md:w-5/6 justify-center bg-white ">
          <div className="sm:m-[8.5px] md:m-0">
            <DataTable id={data} />
          </div>
        </div>
        {/* Table */}
      </div>
    </div>
  );
};

export default PDFGenerator;
