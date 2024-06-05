import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlurBack from "./Blurblack";
import PopupDetail from "./PopupDetail";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

interface DataDisplayProps {
  week: string;
  Topics: {
    Topic: number;
    description: string;
    value: number;
    choice: string[];
  }[];
  Feedback: string;
  By: string;
}

const DataTable = (prop: { id?: number }) => {
  const [Data, setData] = useState<{
    Topics: string[];
    maxTopic: number | 0;
    Forms: DataDisplayProps[];
  }>({
    Topics: [],
    maxTopic: 0,
    Forms: [],
  });

  const [fadeIn, setFadeIn] = useState(false);

  const [DataDisplay, setDataDisplay] = useState<DataDisplayProps>();

  const axiosAuth = useAxiosAuth();

  const valueTopicAVG = (item: DataDisplayProps) => {
    let sum = 0;
    let numTopics = 0;

    item.Topics.forEach((topic) => {
      sum += topic.value;
      numTopics++;
    });

    const averageValue = (sum / numTopics).toFixed(2);

    return (
      <td className="p-3 text-base text-black sm:hidden">{averageValue}</td>
    );
  };

  const valueTopic = (item: DataDisplayProps) => {
    const tds = [];
    for (let index = 0; index < Data.maxTopic; index++) {
      const topic = item.Topics[index];
      if (index <= Data.maxTopic) {
        tds.push(
          <td
            key={index}
            className="p-3 text-black text-xl sm:table-cell"
          >
            <p className="mb-4">{topic ? topic.value : "-"}</p>
          </td>
        );
      }
    }
    return tds;
  };

  useEffect(() => {
    const handleClick = async () => {
      try {
        const result = await axiosAuth.get(`/api/table-details/${prop.id}`);
        console.log(result.data);
        setData({
          ...Data,
          Topics: result.data.Topics,
          maxTopic: result.data.maxTopic,
          Forms: result.data.Forms,
        });

        setFadeIn(true);
      } catch (error) {
        console.log(error);
      }
    };
    handleClick();
    return () => {
      setFadeIn(false);
    };
  }, [prop.id]);

  const [display, setDisplay] = useState(false);
  return (
    <div className="">
      <div
        className={` overflow-auto mb-6 md:overflow-visible rounded-t-lg border border-[#73408A] transition-opacity duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <table className={`w-full ${fadeIn ? "opacity-100" : "opacity-0"}`}>
          <thead className="bg-[#73408A] border-b-2 border-[#73408A]">
            <tr>
              <th className=" w-1/12 p-3 text-lg font-semibold tracking-wide text-left text-white">
                <p className=" mb-4">Week</p>
              </th>
              <th className="w-1/12 p-3 text-sm font-semibold tracking-wide text-left text-white sm:table-cell"></th>
              {Data.Topics.map((item, index) => (
                <th className=" w-5 p-1 text-lg font-semibold tracking-wide text-left text-white sm:table-cell">
                  <p className="mb-4">{Data.Topics[index]}</p>
                </th>
              ))}
              <th className=" w-2/6 p-3 text-lg font-semibold tracking-wide text-left text-white sm:table-cell">
                <p className=" mb-4">Feedback</p>
              </th>
              <th className="w-1/12 p-3 text-sm font-semibold tracking-wide text-left text-white hidden sm:table-cell"></th>
              
            </tr>
          </thead>
          <tbody className="divide-y divide-[#73408A]">
            {Data.Forms.map((item, index) => (
              <tr key={index} className="bg-white">
                <td className="p-3 md:text-base lg:text-xl text-black">
                  <p className="mb-4">{item.week}</p>
                </td>
                <td className="w-1/12 p-3 text-sm font-semibold tracking-wide text-left text-white sm:table-cell"></td>
                {valueTopic(item)}
                <td className="p-3 text-base  lg:text-xl text-black sm:table-cell ">
                  <p className="mb-4">{item.Feedback}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
