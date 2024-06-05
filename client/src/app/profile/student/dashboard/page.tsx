"use client";
import BlurBack from "@/components/dashboard/Blurblack";
import PopupDetail from "@/components/dashboard/PopupDetail";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useContext, useEffect, useRef, useState } from "react";
import RadarChart from "@/components/dashboard/RadarChart";
import Bar from "@/components/dashboard/Bar";
import DiscreteSliderArray from "@/components/dashboard/DiscreteSliderArray";
import DataTable from "@/components/dashboard/DataTable";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { PageProps } from "@/types/next-general";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ReportPage from "@/components/ReportPage";

function page(props: PageProps) {
  const [display, setDisplay] = useState(false);
  const [DataDisplay, setDataDisplay] = useState<{
    skill: string[];
    point: string[];
    description: string[];
    max: number;
  }>();
  const [isLoading, setLoading] = useState(false);
  const [isExport, setExport] = useState(false);
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const axiosAuth = useAxiosAuth();
  const [Data, setData] = useState<{
    name: string;
  }>({
    name: "-",
  });

  const [Paramid, setParamid] = useState<{
    id: number | undefined;
  }>({
    id: props.searchParams?.id ? Number(props.searchParams?.id) : undefined,
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const createPageURL = (id: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("id", id.toString());
    return replace(`${pathname}?${params.toString()}`);
  };

  const downloadPDF = async () => {
    if (!pdfRef.current) return;
    const input = pdfRef.current;

    setLoading(true);
    setExport(true);
    setTimeout(() => {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = -3;

        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save(`${Data.name}-Level-${Paramid.id}`);
      });
      setExport(false);
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    const handleClick = async () => {
      setLoading(true);
      try {
        const result = await axiosAuth.get(`/api/name-course/${Paramid.id}`);
        setData({
          ...Data,
          name: result.data.name,
        });
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    handleClick();
  }, [Paramid.id]);

  useEffect(() => {
    const handleClick = async () => {
      setLoading(true);
      try {
        const result = await axiosAuth.get(`/api/radar-chart/${Paramid.id}`);
        setDataDisplay({
          ...Data,
          skill: result.data.skill,
          description: result.data.description,
          point: result.data.point,
          max: result.data.max,
        });
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    handleClick();
  }, [Paramid.id]);

  useEffect(() => {
    console.log(DataDisplay)
  }, [DataDisplay])

  return (
    <div>
      {isLoading && (
        <>
          <BlurBack open />
          <div className="">
            <div className=" absolute w-[100px] mx-auto top-1/2 left-1/2 -translate-x-1/2  z-[100]">
              <canvas className=" absolute loader w-[100px] mx-auto"></canvas>
            </div>
          </div>
        </>
      )}
      <div
        className={` absolute -left-[9999px] -top-[9999px] ${
          !isExport && "hidden"
        }`}
        ref={pdfRef}
      >
        <ReportPage id={Paramid.id} name={Data.name} />
      </div>
      <div className="bg-[#5D5D5D] text-[#FFFFFF] opacity-50 relative -z-10">
        <p className=" pl-[1.5rem] pt-[0.313rem] pb-[0.188rem] lg:text-xl lg:pl-[7.813rem]">
          ภาพรวม
        </p>
      </div>
      <div className=" mx-2 items-center mt-8 bg-white rounded-[0.625rem] gap-4 flex flex-col drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] ">
        {/* header */}
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="flex flex-col items-center gap-4">
            <p className=" mt-6 lg:text-2xl ">{Data.name}</p>
            <div className="border border-black w-[300px] sm:w-[400px] md:w-[500px] lg:w-[650px] h-[0.1px] bg-black "></div>
          </div>
          <button
            className="bg-[#73408A] rounded-xl p-3 text-white"
            onClick={() => downloadPDF()}
          >
            Export PDF
          </button>
        </div>
        {/* header */}

        {/* Radar/Slider */}
        <div className="radar-slider sm:items-center md:justify-stretch md:items-stretch w-5/6 flex-col flex gap-6 md:flex-row md:gap-2 ">
          {/* Radar/Slider */}
          <div className="radar w-full sm:w-11/12 md:w-3/6 flex flex-col justify-center rounded-t-lg drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] bg-white">
            <div className="bg-[#73408A] w-full m-0 h-auto rounded-t-lg flex justify-center">
              <p className="text-white text-lg p-[0.3rem]">RADAR CHART</p>
              <button
                onClick={() => {
                  setDisplay(true);
                  setDataDisplay(DataDisplay);
                }}
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
              <RadarChart id={Paramid.id} />
            </div>
            <div className="slider flex justify-center ">
              <DiscreteSliderArray
                id={Paramid.id}
                change={(e) => {
                  setParamid({ id: e });
                  createPageURL(e);
                }}
              />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="Bar flex flex-col w-full sm:w-11/12 md:w-3/6 rounded-t-lg drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] bg-white">
            <div className="bg-[#73408A] w-full h-auto rounded-t-lg flex justify-center">
              <p className="text-white text-lg p-[0.3rem]">BAR CHART</p>
            </div>
            <div className="Bar-component overflow-x-auto h-full">
              <Bar id={Paramid.id} />
            </div>
          </div>
          {/* Bar Chart */}
        </div>
        {/* Radar/Slider */}

        {/* Table */}
        <div className="Table w-5/6 sm:w-4/5 md:w-5/6 justify-center bg-white ">
          <div className="sm:m-[8.5px] md:m-0">
            <DataTable id={Paramid.id} />
          </div>
        </div>
        {/* Table */}
      </div>
      {display && (
        <>
          <BlurBack open />
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 z-[100]">
            <PopupDetail
              onClose={() => setDisplay(false)}
              component={
                <>
                  <div className="border-2 border-black px-4 py-2 md:px-7 md:py-5">
                    <div className="overflow-y-auto max-h-[80vh] max-[200px]">
                      <div className="flex flex-col justify-center gap-1">
                        <p className="text-3xl lg:text-4xl self-center mb-5">
                          Skill
                        </p>
                        {DataDisplay?.skill.map((skill, index) => (
                          <div
                            className="flex flex-col mb-7 mx-4 md:mx-8 w-5/6"
                            key={index}
                          >
                            <p className="text-base md:text-lg pb-4">
                              {DataDisplay?.skill[index]}
                            </p>
                            <p className="text-base md:text-lg opacity-90 break-words">
                              {DataDisplay?.description[index]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
export default page;
