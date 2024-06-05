"use client";

import React, { useEffect, useState } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

type StudentData = {
  LineID: String;
  birthday: String;
  nameEN: String;
  nameTH: String;
  nicknameEN: String;
  nicknameTH: String;
  telephone: String;
  school: String;
};

function Page() {
  const [IndexPages, setIndexPages] = useState(0);
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [data, setData] = useState<StudentData>();
  const [imageData, setImageData] = useState<string>(
    "/images/default-profile.jpg"
  );
  const [isClient, setClient] = useState(false);
  const pathname = usePathname();

  const [courseData, setCourseData] = useState<
    {
      name_course: string;
      Levels: {
        id: number;
        level: number;
        curr: boolean;
      }[];
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data
        const profileResponse = await axiosAuth.get(`/api/profile/student`);
        setData({ ...profileResponse.data });
        // Fetch course data
        const courseResponse = await axiosAuth.get(`/api/course/student`);
        setCourseData(courseResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch image data
        const imageResponse = await axiosAuth.get(`/api/image/student`, {
          responseType: "blob", // Ensure the response is treated as a blob
        });

        // Convert Blob to Data URL
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setImageData(reader.result);
          }
        };
        reader.readAsDataURL(imageResponse.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course data
        const courseResponse = await axiosAuth.get(`/api/course/student`);
        setCourseData(courseResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  useEffect(() => {
    if (!isClient) {
      setClient(true);
    }
  }, []);

  return (
    <section className=" w-full">
      <div className="bg-[#5D5D5D] text-[#FFFFFF] opacity-50 relative -z-10">
        <p className=" pl-[1.5rem] pt-[0.313rem] pb-[0.188rem] lg:text-xl lg:pl-[7.813rem]">
          ข้อมูลส่วนตัว
        </p>
      </div>
      <div className=" all flex flex-col lg:flex-row lg:justify-center ">
        <div
          className={` layout-Information mt-8 lg:flex lg:gap-[46px] lg:mt-[2.375rem] lg:justify-center }`}
        >
          <div
            className={`relative z-10 flex flex-col items-center rounded-[0.625rem] bg-white mx-6
              mb-[1.813rem] lg:mr-0 gap-5 drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] 
              ${IndexPages == 1 ? "hidden lg:flex" : "block"}`}
          >
            <a
              href="/profile/editStudent"
              className=" absolute flex self-end mr-2 mt-2 "
            >
              <Image
                alt=""
                src="/images/edit.svg"
                objectFit="cover"
                width={48}
                height={48}
                className=" rounded-full overflow-hidden "
              />
            </a>
            <div className=" PFP w-[158px] h-[158px] lg:w-[334px] lg:h-[334px] mt-7 ">
              <Image
                alt=""
                src={imageData}
                objectFit="cover"
                width={334}
                height={334}
                className=" rounded-full overflow-hidden "
              />
            </div>
            <div className="Name grid grid-col-1 justify-items-center lg:gap-[1rem] lg:mt-9 lg:pr-[4.813rem] lg:pl-[4.375rem]">
              <p className="text-xl lg:text-[1.5rem]">
                {data?.nameTH}&nbsp;
                {data?.nicknameTH}
              </p>
              <p className="text-xs lg:text-lg opacity-75">
                {data?.nameEN}&nbsp;
                {data?.nicknameEN}
              </p>
              <p className="text-xs md:text-base lg:text-lg lg:text-[1rem] mt-[1rem] ">
                โรงเรียน:&nbsp;{data?.school}
              </p>
            </div>
            <div className="mt-[1.5rem] w-[255px] lg:w-[486px] lg:pr-[3.688rem] lg:pl-[3.25rem]">
              <Image
                alt=""
                src="/images/line.png"
                objectFit="cover"
                width={486}
                height={0}
                className="rounded-full overflow-hidden"
              />
            </div>
            <div className="flex justify-center mb-6 mt-8 gap-[0.563rem] lg:pl-[4.813rem] lg:pr-[4.313rem]">
              <div className="flex gap-[2px]">
                <p className="ml-[2.75rem] text-xs md:text-base lg:text-lg lg:text-[0.8rem]">
                  เบอร์โทรศัพท์:&nbsp;
                </p>
                <p className="text-xs md:text-base font-light lg:text-lg lg:text-[0.8rem]">
                  {data?.telephone}
                </p>
              </div>
              <div className="flex gap-[2px]">
                <p className="text-xs md:text-base lg:text-lg">
                  วันเกิด:&nbsp;
                </p>
                <p className="mr-[2.688rem] text-xs md:text-base lg:text-lg font-light lg:text-[0.8rem]">
                  {data?.birthday}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" calendar+course flex flex-col lg:mt-3 lg:mb-10 ">
          <div className=" z-10 calendar m-6 rounded-[0.625rem] p-2 lg:w-[450px] bg-white drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)] ">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView={"dayGridMonth"}
            />
          </div>
          <div className="course flex flex-col items-center mx-6 my-2  rounded-[0.625rem] bg-white drop-shadow-[10px_10px_10px_rgba(0,0,0,0.25)]">
            {courseData.map((course) => (
              <div
                key={course.name_course}
                className=" w-11/12 course flex flex-col items-center mx-4 my-2   rounded-[0.625rem] bg-transparent "
              >
                {/* Render the course name */}
                <span className="mt-6 lg:text-xl">{course.name_course}</span>
                {/* Divider line */}
                <div className="mt-3 border border-black h-0 w-5/6"></div>
                {/* Render level buttons */}
                <div className="level-button mt-4 mb-4">
                  <div className="level-set flex gap-1">
                    {/* Map through each level in the course and render a button for it */}
                    {course.Levels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => {
                          // Pass id here!!!
                          router.push(`${pathname}/dashboard?id=${level.id}`);
                        }}
                        // Disable the button if curr is false
                        disabled={!level.curr}
                        // Determine button styles based on curr
                        className={`${
                          level.curr // Check if curr is true
                            ? "bg-[#73408A] cursor-pointer"
                            : "bg-[#9B9B9B] cursor-not-allowed"
                        } level-${
                          level.level
                        } w-8 h-8 rounded-lg flex justify-center items-center text-white`}
                      >
                        {level.level}{" "}
                        {/* Render the level number inside the button */}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
