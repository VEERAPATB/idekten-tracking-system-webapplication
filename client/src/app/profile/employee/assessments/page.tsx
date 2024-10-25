"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { CourseProps, PageProps, TopicFormsProps } from "@/types/next-general";
import FilterTable from "@/components/Assessment/FilterTable";
import Table from "@/components/Assessment/Table";
import SearchStudent from "@/components/Assessment/SearchStudent";
import Pagination from "@/components/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { useDebouncedCallback } from "use-debounce";

const PAGE_SIZE = 6;

const Page = (props: PageProps) => {
  const [page, setPage] = useState<number>(Number(props.searchParams?.p) || 1);
  const [week, setWeek] = useState<string>(
    props.searchParams?.w === undefined ? "" : props.searchParams?.w.toString()
  );
  const [course, setCourse] = useState<String>(
    props.searchParams?.c === undefined ? "" : props.searchParams?.c.toString()
  );
  const [query, setQuery] = useState<string>(
    props.searchParams?.q ? props.searchParams?.q.toString() : ""
  );
  const [data, setData] = useState<TopicFormsProps | null>(null);
  const [dataCourse, setDataCourse] = useState<CourseProps | null>(null);

  const axiosAuth = useAxiosAuth();
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(true);

  const performFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (course !== "") {
      params.set("c", course.toString());
    } else {
      params.delete("c");
    }

    if (week !== "") {
      params.set("w", week);
    } else {
      params.delete("w");
    }

    if(query !== ""){
      params.set("q", query);
    }else{
      params.delete("q")
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("p", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleSearch = useDebouncedCallback((text: string) => {
    setQuery(text)
  }, 200)

  const fetchCourse = async () => {
    try {
      const response = await axiosAuth.get("/api/courses");
      setDataCourse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle page
  useEffect(() => {
    replace(createPageURL(page));
  }, [page]);

  // Handle course
  useEffect(() => {
    performFilter();
  }, [course,week, query]);

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axiosAuth.get("/api/forms", {
        params: {
          p: page,
          l: PAGE_SIZE,
          w: week || undefined,
          c: course || undefined,
          q: query || undefined
        },
      });
      setLoading(false)
      setData(response.data);
    } catch (error) {
      setLoading(false)
      console.log(`Error: ${error}`);
    }
  };

  // Fetch courses data
  useEffect(() => {
    fetchCourse();
  }, []);

  // Fetch Data
  useEffect(() => {
    fetchData();
  }, [page, week, course, query]);

  useEffect(() => {
    setPage(1)
  }, [week, course, query])

  return (
    <div>
      <div className="bg-[#5D5D5D] text-[#FFFFFF] opacity-50 relative -z-10">
        <p className=" pl-[1.5rem] pt-[0.313rem] pb-[0.188rem] lg:text-xl lg:pl-[7.813rem]">
          แบบประเมิน
        </p>
      </div>
      <div className="container mx-auto mt-11 rounded-[0.625rem] border-[1px] border-[#9B9B9B] shadow-[10px_10px_10px_0px_rgba(0,0,0,0.25)] bg-[#FFF] text-[#3D3C3C]">
        <div className="header flex justify-between md:mt-[4rem] md:mb-8 mt-6 mb-4 px-6 xl:px-[6rem]">
          <h5 className="font-medium leading-snug text-lg text-left md:text-2xl">
            แบบประเมิน
          </h5>
          <div className="w-[22rem] md:flex hidden">
            <SearchBar 
              placeholder="ค้นหาชื่อเเบบประเมิน..."
              onSelect={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className=" lg:mx-6 xl:mx-[6rem] flex flex-col gap-[0.5rem] md:mx-[2rem]">
          <FilterTable
            firstFilter={{
              title: "คอร์สทั้งหมด",
              children: dataCourse?.Course,
            }}
            secondFilter={{
              title: "สัปดาห์ทั้งหมด",
              children: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            }}
            onChangeCourse={(e: ChangeEvent<HTMLSelectElement>) =>
              setCourse(e.target.value)
            }
            onChangeWeek={(e: ChangeEvent<HTMLSelectElement>) =>
              setWeek(e.target.value)
            }
          />
          <Table
            loading={isLoading}
            children={data?.TopicAssessment}
            popupDisplay={<SearchStudent />}
            limitSize={PAGE_SIZE}
            currentPage={page - 1}
          />
          <div className="my-[3rem] mx-[1rem]">
            <Pagination
              currentPage={page}
              totalPage={data?.meta.pageCount}
              onLeft={() => setPage((prev) => prev - 1)}
              onRight={() => setPage((prev) => prev + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
