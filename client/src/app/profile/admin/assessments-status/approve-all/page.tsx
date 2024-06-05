"use client";

import { AssessmentStatusProps, PageProps } from "@/types/next-general";
import React, { useEffect, useState } from "react";
import BlurBack from "@/components/BlurBack";
import NavigateBar from "@/components/Assessment-status/NavigateBar";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import Table from "@/components/Assessment-status/Table";
import Pagination from "@/components/Pagination";
import Dropdown from "@/components/Dropdown";

const LIMIT_SIZE = 6

const page = (props: PageProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const axiosAuth = useAxiosAuth()

  const [status, setStatus] = useState<string>(
    props.searchParams?.status ? props.searchParams?.status.toString() : "no"
  );
  const [query, setQuery] = useState(props.searchParams?.q ? props.searchParams?.q.toString() : "")
  const [data, setData] = useState<AssessmentStatusProps | undefined>()

  const [page, setPage] = useState<number>(Number(props.searchParams?.p || 1));
  const [totalPage, setTotalPage] = useState<number | undefined>();

  const [branchDropdown, setBrachDrop] = useState<string[] | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [branch, setBranch] = useState<string>(props.searchParams?.b ? props.searchParams?.b.toString() : "");

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

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data }: { data: AssessmentStatusProps } = await axiosAuth.get(
        "/api/status/approve",
        {
          params: {
            p: page,
            l: LIMIT_SIZE,
            f: query || undefined,
            b: branch || undefined,
          },
        }
      );
      setData(data);
    } catch (error) {
      console.error(`Error: ${error}`);
      alert('Something went wrong please, contact support or try again later.')
    }
    setLoading(false)
  };

  const fetchApproveData = async () => {
    setLoading(true)
    try {
      const { data }: { data: AssessmentStatusProps } = await axiosAuth.get(
        "/api/status/clear",
        {
          params: {
            p: page,
            l: LIMIT_SIZE,
            f: query || undefined,
            b: branch || undefined,
          },
        }
      );
      setData(data);
    } catch (error) {
      console.error(`Error: ${error}`);
      alert('Something went wrong please, contact support or try again later.')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBranch()
    if(status === "yes"){
      fetchApproveData()  
    }else{
      fetchData()
    }
  },[page, query, branch, status])

  useEffect(() => {
    if(data && data?.meta.total < 1) return
    setTotalPage(data?.meta.pageCount)
  },[data])

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
        <div className="w-[20rem]">
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
          <div className="pt-[4rem] mx-14 relative">
            <div className="navbar flex justify-between cursor-pointer ">
              <NavigateBar
                list={[
                  {
                    name: "ยังไม่ถูกประเมิน",
                    enabled: false,
                    fn: () => {
                        setLoading(true)
                        router.push(`/profile/admin/assessments-status`)
                    },
                  },
                  {
                    name: "ยังไม่ถูกอนุมัติ",
                    enabled: status === "no",
                    fn: () => {
                      if(status === 'no') return
                      setLoading(true);
                      setStatus("no")
                      router.push(`${pathname}?status=no`);
                    },
                  },
                  {
                    name: "อนุมัติแล้ว",
                    enabled: status === "yes",
                    fn: () => {
                      if(status === 'yes') return
                      setLoading(true);
                      setStatus("yes")
                      router.push(`${pathname}?status=yes`);
                    },
                  },
                ]}
              />
              <div className="md:w-[20rem]">
                <SearchBar
                  onSelect={(e) => handleSearch(e)}
                  placeholder={"ค้นหาชื่อวิชา..."}
                />
              </div>
            </div>
            <div className="main my-[1.5rem] border-[1px] border-[#73408A] rounded-md">
              <Table
                hasFunction={true}
                thead={[
                  "สาขา",
                  "วิชา",
                  "สัปดาห์",
                  "ยังไม่อนุมัติ",
                  "ขาดส่งประเมิน",
                  "",
                ]}
                children={data?.topic}
                function={[
                  {
                    name: "",
                    function: (id, classId) => {
                      setLoading(true);
                      router.push(
                        `/profile/admin/assessments-status/status?approve=all&id=${id}&class=${classId}`
                      );
                    },
                  },
                  {
                    name: "",
                    function: (id, classId) => {
                      setLoading(true);
                      router.push(
                        `/profile/admin/assessments-status/approve-id?status=no&id=${id}&class=${classId}`
                      );
                    },
                  },
                ]}
              />
            </div>
            <div className="pagination flex mt-8 relative w-full py-[2rem] px-[1.25rem]">
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
