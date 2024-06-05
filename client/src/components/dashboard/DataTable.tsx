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

    item.Topics.forEach(topic => {
      sum += topic.value;
      numTopics++;
  });

    const averageValue = (sum / numTopics).toFixed(2);

    return  <td className="p-3 text-base text-black sm:hidden">{averageValue}</td>;
  };

  const valueTopic = (item: DataDisplayProps) => {
    const tds = [];
    for (let index = 0; index < Data.maxTopic; index++) {
      const topic = item.Topics[index];
      if (index <= Data.maxTopic) {
        tds.push(
          <td
            key={index}
            className="p-3 text-sm text-black hidden sm:table-cell"
          >
            {topic ? topic.value : "-"}
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
        className={`overflow-auto mb-6 md:overflow-visible rounded-t-lg border border-[#73408A] transition-opacity duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <table className={`w-full ${fadeIn ? "opacity-100" : "opacity-0"}`}>
          <thead className="bg-[#73408A] border-b-2 border-[#73408A]">
            <tr>
              <th className=" w-4/12 md:w-1/12 p-3 text-lg font-semibold tracking-wide text-left text-white">
                Week
              </th>
              <th className=" w-6 p-3 text-lg font-semibold tracking-wide text-left text-white sm:hidden">
                Avg.score
              </th>
              <th className="w-2/6 p-3 text-lg font-semibold tracking-wide text-left text-white hidden sm:table-cell">
                Feedback
              </th>
              <th className="w-1/12 p-3 text-sm font-semibold tracking-wide text-left text-white hidden sm:table-cell"></th>
              <th className="p-3 sm:hidden">
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#73408A]">
            {Data.Forms.map((item, index) => (
              <tr key={index} className="bg-white">
                <td className="p-3 md:text-base lg:text-xl text-black">{item.week}</td>
                {valueTopicAVG(item)}
                <td className="p-3 text-base  lg:text-xl text-black  hidden sm:table-cell ">
                  {item.Feedback}
                </td>
                <td className=" w-12  p-3 text-base text-black  ">
                  <button
                    onClick={() => {
                      setDisplay(true);
                      setDataDisplay({ ...item });
                    }}
                    className="bg-[#73408A] rounded-xl w-12  p-1 flex items-center justify-center "
                  >
                    <Image
                      alt=""
                      src="/images/I-icon.svg"
                      width={32}
                      height={32}
                      className=" rounded-full overflow-hidden "
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {display && (
        <>
          <BlurBack open />
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center  bg-opacity-75 z-[100]">
            <PopupDetail
              onClose={() => setDisplay(false)}
              component={
                <>
                  <div className=" border-2 border-black px-4 py-2 md:px-7 md:py-5">
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-[2.25rem] text-center">
                        {DataDisplay?.week}
                      </span>
                      <span className="my-2 text-lg">
                        ชื่อผู้ประเมิน: {DataDisplay?.By}
                      </span>
                      <div className="text-lg flex flex-col">
                        {DataDisplay?.Topics.map((topic, index) => (
                          <span key={index}>
                            {Data.Topics[index]}: {topic.value} คะแนน
                          </span>
                        ))}
                      </div>
                      <span className="mt-4 mb-2 text-lg">Scoring Rubrics</span>
                      {DataDisplay?.Topics.map((topic, index) => (
                        <div className="flex flex-col" key={index}>
                          <span className="text-md ">{topic.description}</span>
                          {topic.choice.map((ch, index) => (
                            <p
                              className="ml-2 my-1 text-sm gap-2 opacity-80"
                              key={index}
                            >
                              {ch}
                            </p>
                          ))}
                        </div>
                      ))}
                      <div className="flex flex-col">
                        <span className="text-lg">Feedback</span>
                        <p className="ml-2 text-sm opacity-80">
                          {DataDisplay?.Feedback}
                        </p>
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
};

export default DataTable;
