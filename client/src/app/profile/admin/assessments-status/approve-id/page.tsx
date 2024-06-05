"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import BlurBack from "@/components/BlurBack";
import NavigateBar from "@/components/Assessment-status/NavigateBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import {
  PageProps,
  StatusNotApproveProps,
  CellStatusNotApproveProps,
} from "@/types/next-general";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useDebouncedCallback } from "use-debounce";
import TableApprove from "@/components/Assessment-status/TableApprove";
import PopupDetail from "@/components/PopupDetail";
import Button from "@/components/Button";
import PopupDanger from "@/components/PopupDanger";

const LIMIT_SIZE = 6;

const THEAD_APPROVE_ID = [
  "วัน/เดือน/ปี",
  "ชื่อ-นามสกุล (นักเรียน)",
  "ชื่อ-นามสกุล (ผู้ประเมิน)",
  "Feedback",
  "การจัดการ",
];

const page = (props: PageProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const axiosAuth = useAxiosAuth();

  const [danger, setDanger] = useState(false);
  const [status, setStatus] = useState(
    props.searchParams?.status ? props.searchParams?.status.toString() : ""
  );
  const [newFeedback, setFeedback] = useState("");
  const [approveEach, setApproveEach] = useState<
    CellStatusNotApproveProps | undefined
  >();
  const [page, setPage] = useState<number>(Number(props.searchParams?.p || 1));
  const [totalPage, setTotalPage] = useState<number | undefined>();
  const formInfo: { id?: number; class?: number } = {
    id: Number(props.searchParams?.id),
    class: Number(props.searchParams?.class),
  };
  const [popupInfo, setPopupInfo] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState(
    props.searchParams?.q ? props.searchParams?.q.toString() : ""
  );
  const [data, setData] = useState<StatusNotApproveProps | undefined>();

  const handleSearch = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    450
  );

  const performApproveAll = async () => {
    setLoading(true)
    try {
      const { status } = await axiosAuth.put(`/api/status/${formInfo.class}/${formInfo.id}/not-approved`)
    } catch (error) {
      console.error(`Error : ${error}`)
      alert('Something went wrong please, contact support or try again later.')
    }
    setRefresh(prev => !prev)
    setDanger(false)
  }

  const performApproveEach = async (idFeedback?: number, feedback?: string) => {
    setLoading(true);
    try {
      const { status } = await axiosAuth.put(
        `/api/status/approveding/${idFeedback}`,
        {
          feedback: feedback,
        }
      );
    } catch (error) {
      console.error(`Error : ${error}`)
      alert('Something went wrong please, contact support or try again later.')
    }
    setRefresh(prev => !prev)
    setPopupInfo(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data }: { data: StatusNotApproveProps } = await axiosAuth.get(
        `/api/status/${formInfo?.class}/${formInfo?.id}/not-approved`,
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
      alert('Something went wrong please, contact support or try again later.')
    }
    setLoading(false);
  };

  const fetchApproveData = async () => {
    setLoading(true);
    try {
      const { data }: { data: StatusNotApproveProps } = await axiosAuth.get(
        `/api/status/${formInfo?.class}/${formInfo?.id}/confirmed`,
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
      console.error(`Error: ${error}`);
      alert('Something went wrong please, contact support or try again later.')
    }
    setLoading(false);
  };

  useEffect(() => {
    if (status === "yes") {
      fetchApproveData();
    } else {
      fetchData();
    }
  }, [page, query, status, refresh]);

  useEffect(() => {
    if (!approveEach) return;
    setFeedback(approveEach?.feedback);
  }, [approveEach]);

  useEffect(() => {
    if(data && data?.meta.total < 1) return
    setTotalPage(data?.meta.pageCount);
  }, [data]);

  return (
    <>
      {popupInfo && (
        <>
          <BlurBack open />
          <div className="mx-[1.5rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]">
            <PopupDetail
              label="รายละเอียดเพิ่มเติม"
              onClose={() => setPopupInfo(false)}
              function={{
                name: "ยินยัน",
                disabled: status === "yes",
                function: () => {
                  performApproveEach(approveEach?.id, newFeedback);
                  setRefresh(prev => !prev);
                },
              }}
              component={
                <>
                  <div className="grid grid-cols-2 gap-[0.875rem]">
                    <p className=" font-medium">ชื่อ-นามสกุล (นักเรียน) :</p>
                    <p>{approveEach?.student.name}</p>
                    <p className=" font-medium">ชื่อ-นามสกุล (ผู้ประเมิน) :</p>
                    <p>{approveEach?.employee.name}</p>
                    <p className=" row-span-2 font-medium">ช่องทางการติดต่อ</p>
                    <p>{approveEach?.employee.telephone}</p>
                    <p>{approveEach?.employee.email}</p>
                  </div>
                  <div className="flex flex-col gap-[0.25rem]">
                    <h4 className=" font-medium">Feedback/Detail</h4>
                    <textarea
                      rows={4}
                      value={newFeedback}
                      disabled={status === "yes"}
                      className="w-full border-[1px] border-[#9B9B9B] p-[0.5rem] bg-[#F3F3F3] rounded-md outline-none resize-none"
                      onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>
                  </div>
                </>
              }
            />
          </div>
        </>
      )}
      {danger && (
        <>
          <BlurBack open/>
          <div className="mx-[1.5rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]">
            <PopupDanger
              head="คุณกำลังจะอนุมัติการประเมินทั้งหมดในคลาศนี้"
              description="เมื่อกดตกลงอนุมัติการประเมินทั้งหมดคุณจะไม่สามารถย้อนกลับการอนุมัติได้"
              onClose={() => setDanger(false)}
              function={{
                name: "ยินยัน",
                function: () => {
                  if(status === 'yes') return
                  performApproveAll()
                  setRefresh(prev => !prev)
                },
              }}
            />
          </div>
        </>
      )}
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
        <div className="container mx-auto bg-white w-full shadow-[10px_10px_10px_0_rgba(0,0,0,0.25)] rounded-[0.625rem] relative">
          <div className="pt-[4rem] mx-14 relative">
            <div className="navbar flex justify-between cursor-pointer ">
              <NavigateBar
                list={[
                  {
                    name: "ยังไม่ถูกอนุมัติ",
                    enabled: status === "no",
                    fn: () => {
                      if (status === "no") return;
                      setLoading(true);
                      setStatus("no");
                      router.push(
                        `${pathname}?status=no&id=${formInfo.id}&class=${formInfo.class}`
                      );
                    },
                  },
                  {
                    name: "อนุมัติแล้ว",
                    enabled: status === "yes",
                    fn: () => {
                      if (status === "yes") return;
                      setLoading(true);
                      setStatus("yes");
                      router.push(
                        `${pathname}?status=yes&id=${formInfo.id}&class=${formInfo.class}`
                      );
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
              <TableApprove
                thead={THEAD_APPROVE_ID}
                children={data?.list}
                function={[
                  {
                    name: "",
                    function: ({ cell }) => {
                      setPopupInfo(true);
                      setApproveEach(cell);
                    },
                  },
                  {
                    name: "อนุมัติ",
                    disabled: status === "yes",
                    function: ({ cell }) => {
                      performApproveEach(cell?.id, cell?.feedback);
                      setRefresh(prev => !prev)
                    },
                  },
                ]}
              />
            </div>
            {status !== 'yes' && (
              <div className="relative flex justify-between mx-[1rem]">
                <p></p>
                <div>
                  <Button
                    label="อนุมัติทั้งหมด"
                    disabled={data && data?.meta.total < 1}
                    style={`${(data && data?.meta.total < 1) ? 'bg-[#9B9B9B]' : 'bg-[#D29F48]'} text-[#F3F3F3] px-[1rem] py-[0.5rem]`}
                    onClick={() => setDanger(true)}
                  />
                </div>
              </div>
              )
            }
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
