"use client";

import React, { useEffect, useState } from "react";
import BlurBack from "@/components/BlurBack";
import Button from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";
import NavigateBar from "@/components/Assessment-status/NavigateBar";
import Pagination from "@/components/Pagination";
import { StatusNotSendProps } from "@/types/next-general";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { PageProps } from "@/types/next-general";
import TableStatus from "@/components/Assessment-status/TableStatus";
import SearchBar from "@/components/SearchBar";
import { useDebouncedCallback } from "use-debounce";
import { ChangeEvent } from "react";

const THEAD_STATUS = ["รหัสบัญชี", "ชื่อ-นามสกุล", "ชื่อเล่น", "การประเมิน"];
const LIMIT_SIZE = 6;

const page = (props: PageProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const axiosAuth = useAxiosAuth();

  const [isLoading, setLoading] = useState(false);
  const formInfo: { id?: number; class?: number } = {
    id: Number(props.searchParams?.id),
    class: Number(props.searchParams?.class),
  };

  const [data, setData] = useState<StatusNotSendProps | undefined>();
  const [page, setPage] = useState(
    props.searchParams?.p ? Number(props.searchParams?.p) : 1
  );
  const [totalPage, setTotalPage] = useState<number>();
  const [status, setStatus] = useState(
    props.searchParams?.approve ? props.searchParams?.approve.toString() : ""
  );
  const [query, setQuery] = useState(
    props.searchParams?.q ? props.searchParams?.q.toString() : undefined
  );

  const handleSearch = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    450
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data }: { data: StatusNotSendProps } = await axiosAuth.get(
        `/api/status/${formInfo?.class}/${formInfo?.id}/check-send`,
        {
          params: {
            p: page,
            l: LIMIT_SIZE,
            q: query || undefined,
          },
        }
      );
      setData(data);
    } catch (error) {
      console.error(`Error : ${error}`);
    }
    setLoading(false);
  };

  const fetchNotPassed = async () => {
    setLoading(true)
    try {
      const { data }: { data: StatusNotSendProps } = await axiosAuth.get(
        `/api/status/${formInfo?.class}/${formInfo?.id}/unsend`,
        {
          params: {
            p: page,
            l: LIMIT_SIZE,
            q: query || undefined,
          },
        }
      );
      setData(data)
    } catch (error) {
      console.error(`Error: ${error}`);
    }
    setLoading(false)
  }

  const fetchPassed = async () => {
    setLoading(true)
    try {
      const { data }: { data: StatusNotSendProps } = await axiosAuth.get(
        `/api/status/${formInfo?.class}/${formInfo?.id}/send`,
        {
          params: {
            p: page,
            l: LIMIT_SIZE,
            q: query || undefined,
          },
        }
      );
      setData(data)
    } catch (error) {
      console.error(`Error : ${error}`);
    }
    setLoading(false)
  }

  useEffect(() => {
    if(status === 'yes'){
      fetchPassed()
    }else if(status === 'no'){
      fetchNotPassed()
    }else{
      fetchData()
    }
  }, [page, query, status]);

  useEffect(() => {
    if(data && data?.meta.total < 1) return
    setTotalPage(data?.meta.pageCount);
  }, [data]);

  return (
    <>
      <div className=" container mx-auto mt-[4.5rem] flex flex-col gap-[0.75rem]">
        <div className="w-[10rem]">
          <Button
            label="ย้อนกลับ"
            border={true}
            style="border-2 border-[#73408A] h-[2.5rem] items-center rounded-2xl text-[#73408A] hover:text-[#522D62] hover:border-[#522D62]"
            onClick={() => {
              setLoading(true);
              router.push("/profile/admin/assessments-status");
            }}
          />
        </div>
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
        <div className="container mx-auto bg-white w-full shadow-[10px_10px_10px_0_rgba(0,0,0,0.25)] rounded-[0.625rem] relative">
          <div className="pt-[4rem] mx-14 relative">
            <div className="navbar flex justify-between cursor-pointer ">
              <NavigateBar
                list={[
                  {
                    name: "ทั้งหมด",
                    enabled: status === 'all',
                    fn: () => {
                      if(status === 'all') return 
                      setLoading(true);
                      setStatus('all')
                      router.push(`${pathname}?approve=all&class=${formInfo.class}&id=${formInfo.id}`);
                    },
                  },
                  {
                    name: "ยังไม่ถูกประเมิน",
                    enabled: status === 'no',
                    fn: () => {
                      if(status === 'no') return 
                      setLoading(true);
                      setStatus('no')
                      router.push(`${pathname}?approve=no&class=${formInfo.class}&id=${formInfo.id}`);
                    },
                  },
                  {
                    name: "ประเมินแล้ว",
                    enabled: status === 'yes',
                    fn: () => {
                      if(status === 'yes') return
                      setLoading(true);
                      setStatus('yes')
                      router.push(`${pathname}?approve=yes&class=${formInfo.class}&id=${formInfo.id}`);
                    },
                  },
                ]}
              />
              <div className="md:w-[20rem]">
                <SearchBar
                  onSelect={(e) => handleSearch(e)}
                  placeholder={"ค้นหาชื่อนักเรียน..."}
                />
              </div>
            </div>
            <div className="main my-[1.5rem] border-[1px] border-[#73408A] rounded-md">
              <TableStatus
                thead={THEAD_STATUS}
                children={data?.data}
                page={status}
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
