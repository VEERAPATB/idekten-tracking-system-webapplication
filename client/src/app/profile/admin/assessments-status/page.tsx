"use client";

import Pagination from "@/components/Pagination";
import React, { ChangeEvent, Suspense, useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import Table from "@/components/Assessment-status/Table";
import SearchBar from "@/components/SearchBar";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import {
  AssessmentStatusProps,
  PageProps,
} from "@/types/next-general";
import { useDebouncedCallback } from "use-debounce";
import BlurBack from "@/components/BlurBack";
import NavigateBar from "@/components/Assessment-status/NavigateBar";
import { usePathname, useRouter } from "next/navigation";

const LIMIT_SIZE = 6;

const page = (props: PageProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const axiosAuth = useAxiosAuth();

  const [branchDropdown, setBrachDrop] = useState<string[] | undefined>();

  // Approve first page
  const [notEvaluates, setNotEvaluates] =
    useState<AssessmentStatusProps | null>(null);

  const [page, setPage] = useState<number>(Number(props.searchParams?.p || 1));
  const [totalPage, setTotalPage] = useState<number | undefined>();

  const [branch, setBranch] = useState<string>(props.searchParams?.b ? props.searchParams?.b.toString() : "");
  const [query, setQuery] = useState<string>(props.searchParams?.q ? props.searchParams?.q.toString() : "");
  const [isLoading, setLoading] = useState(false);

  const handleSearch = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    450
  );

  const fetchBranch = async () => {
    try {
      const { data } = await axiosAuth.get("/api/branch");
      setBrachDrop(data?.nameBranch);
    } catch (error) {
      console.error(`Error: ${error}`);
      alert('Something went wrong please, contact support or try again later.')
    }
  };

  const fetchNotEvaluate = async () => {
    setLoading(true)
    try {
      const { data }: { data: AssessmentStatusProps } = await axiosAuth.get(
        "/api/status/unsend",
        {
          params: {
            p: page,
            l: LIMIT_SIZE,
            f: query || undefined,
            b: branch || undefined,
          },
        }
      );
      setNotEvaluates(data);
    } catch (error) {
      console.error(`Error: ${error}`);
      alert('Something went wrong please, contact support or try again later.')
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchBranch()
    fetchNotEvaluate()
  },[])

  useEffect(() => {
    fetchNotEvaluate()
  },[page, query, branch])

  useEffect(() => {
    if(notEvaluates && notEvaluates?.meta.total < 1) return
    setTotalPage(notEvaluates?.meta.pageCount)
  },[notEvaluates])

  return (
    <>
      <div className=" container mx-auto mt-[4.5rem] flex flex-col gap-[0.75rem]">
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
          <div className="md:w-[20rem] w-[21.5rem] mx-[1rem] md:mx-0 flex flex-col gap-[0.5rem]">
            <div className="md:hidden">
              <SearchBar
                onSelect={(e) => handleSearch(e)}
                placeholder={"ค้นหาชื่อวิชา..."}
              />
            </div>
            <Dropdown
              label="สาขาทั้งหมด"
              children={branchDropdown ? branchDropdown : []}
              style="bg-[#73408A] text-[#F3F3F3] rounded-lg"
              default={branch}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setBranch(e.target.value)
              }
            />
          </div>
        <div className="container mx-auto bg-white w-full shadow-[10px_10px_10px_0_rgba(0,0,0,0.25)] rounded-[0.625rem] relative">
          <div className="md:pt-[4rem] pt-[3rem] md:mx-14 relative mx-[1.5rem]">
            <div className="navbar flex justify-between cursor-pointer ">
              <NavigateBar 
                list={[
                  {
                    name: 'ยังไม่ถูกประเมิน',
                    enabled: true,
                    fn: () => {}
                  },
                  {
                    name: 'ยังไม่ถูกอนุมัติ',
                    enabled: false,
                    fn: () => {
                      setLoading(true)
                      router.push(`${pathname}/approve-all?status=no`)
                    }
                  },
                  {
                    name: 'อนุมัติแล้ว',
                    enabled: false,
                    fn: () => {
                      setLoading(true)
                      router.push(`${pathname}/approve-all?status=yes`)
                    }
                  }
                ]}
              />
              <div className="md:w-[20rem] md:block hidden">
                <SearchBar
                  onSelect={(e) => handleSearch(e)}
                  placeholder={"ค้นหาชื่อวิชา..."}
                />
              </div>
            </div>
            <div className="main my-[1.5rem] border-[1px] border-[#73408A] rounded-md overflow-x-auto">
              <Table
                currentPage={page}
                hasFunction={true}
                thead={[
                  "สาขา",
                  "วิชา",
                  "สัปดาห์",
                  "ยังไม่อนุมัติ",
                  "ขาดส่งประเมิน",
                  "",
                ]}
                children={notEvaluates?.topic}
                function={[
                  {
                    name: "",
                    function: (id, classId) =>{
                      setLoading(true)
                      router.push(`${pathname}/status?approve=all&id=${id}&class=${classId}&hp=${pathname}?p=${page}`)
                    }
                  },
                  {
                    name: "",
                    function: (id, classId) =>{
                      setLoading(true)
                      router.push(`${pathname}/approve-id?status=no&id=${id}&class=${classId}&hp=${pathname}?p=${page}`)
                    }
                  },
                ]}
              />
            </div>
            <div className=" text-[#9B9B9B] text-right text-sm">
                <p>หมายเหตุ: เเนะนำการเเสดงผลสำหรับบนคอมพิวเตอร์</p>
            </div>
            <div className="pagination flex relative w-full py-[2rem] px-[1.25rem]">
              <Pagination
                totalPage={totalPage}
                currentPage={page}
                onLeft={() => setPage((prev) => prev - 1)}
                onRight={() => setPage((prev) => prev + 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
