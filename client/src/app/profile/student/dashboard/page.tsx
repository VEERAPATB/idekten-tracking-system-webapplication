"use client";

import React, { useContext, useEffect, useState } from "react";
import RadarChart from "@/components/dashboard/RadarChart";
import Bar from "@/components/dashboard/Bar";
import DiscreteSliderArray from "@/components/dashboard/DiscreteSliderArray";
import DataTable from "@/components/dashboard/DataTable";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { PageProps } from "@/types/next-general";
import { useSearchParams, usePathname, useRouter} from "next/navigation";

function page(props: PageProps) {


  const axiosAuth = useAxiosAuth();
  const [Data, setData] = useState<{
    name: string
  }>({
    name: "-"
  });

  const [Paramid, setParamid] = useState<{
    id: number | undefined,
  }>({
    id: props.searchParams?.id ? Number(props.searchParams?.id) : undefined,
  });

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()
  
  const createPageURL = (id: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('id', id.toString())
    return replace(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    const handleClick = async () => {
      try {
        const result = await axiosAuth.get(`/api/name-course/${Paramid.id}`);
        console.log(result.data);
        setData({
          ...Data,
          name: result.data.name,
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleClick();
  }, [Paramid.id]);

  return (
    <div>
      <div className="bg-[#5D5D5D] text-[#FFFFFF] opacity-50 relative -z-10">
        <p className=" pl-[1.5rem] pt-[0.313rem] pb-[0.188rem] lg:text-xl lg:pl-[7.813rem]">
          ภาพรวม
        </p>
      </div>
      <div className=" mx-2 items-center mt-8 bg-white rounded-[0.625rem] gap-4 flex flex-col drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] ">
        {/* header */}
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="flex flex-col items-center gap-4">
            <span className=" mt-6 lg:text-2xl ">{Data.name}</span>
            <div className="border border-black w-[300px] sm:w-[400px] md:w-[500px] lg:w-[650px] h-[0.1px] bg-black "></div>
          </div>
        </div>
        {/* header */}

        {/* Radar/Slider */}
        <div className="radar-slider items-center md:items-stretch w-5/6 flex-col flex gap-6 md:flex-row md:gap-2 ">
          {/* Radar/Slider */}
          <div className="radar w-full sm:w-11/12 md:w-3/6 flex flex-col justify-center rounded-t-lg drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] bg-white">
            <div className="bg-[#73408A] w-full h-[26px] rounded-t-lg flex justify-center">
              <p className="text-white text-lg">RADAR CHART</p>
            </div>
            <div className="radar-component ">
              <RadarChart id={Paramid.id}/>
            </div>
            <div className="slider flex justify-center ">
              <DiscreteSliderArray id={Paramid.id} change={(e)=> 
              {setParamid({id:e})
              createPageURL(e)
              } }/>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="Bar flex flex-col w-full sm:w-11/12 md:w-3/6 rounded-t-lg drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] bg-white">
            <div className="bg-[#73408A] w-full h-[26px] rounded-t-lg flex justify-center">
              <p className="text-white text-lg">BAR CHART</p>
            </div>
            <div className="Bar-component h-full">
              <Bar id={Paramid.id}/>
            </div>
          </div>
          {/* Bar Chart */}
        </div>
        {/* Radar/Slider */}

        {/* Table */}
        <div className="Table w-5/6 sm:w-4/5 md:w-5/6 justify-center bg-white ">
          <div className="sm:m-[8.5px] md:m-0">
            <DataTable id={Paramid.id}/>
          </div>
        </div>
        {/* Table */}
      </div>
    </div>
  );
}
export default page;
