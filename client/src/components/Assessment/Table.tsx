"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Popup from "./Popup";
import { FormDetailProps } from "@/types/next-general";
import {
  AssessmentActionKind,
  AssessmentResultContext,
} from "@/lib/context/AssessmentResultContext";
import { useRouter } from "next/navigation";
import { StudentContext } from "@/lib/context/StudentContext";
import BlurBack from "../BlurBack";
import Button from "./ButtonAssessment";
import { FunctionProps } from "@/types/next-general";

const Table = (props: {
  children?: FormDetailProps[];
  onClickMobile?: () => void;
  functionDesktop?: FunctionProps[];
  popupDisplay?: React.ReactNode;
  popupLabel?: string;
  popupDescription?: string;
  currentPage: number
  limitSize: number
  loading: boolean
}) => {
  const router = useRouter();

  const { stateAs, dispatchAs } = useContext(AssessmentResultContext);
  const { state } = useContext(StudentContext);

  const [studentTotal, setStudentTotal] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const popupContentRef = useRef(null);
  const [isLoading, setLoading] = useState(false)

  const prepareAssessment = useCallback((name: string, id: number) => {
    dispatchAs({
      type: AssessmentActionKind.ADDED_NAME,
      id: id,
      name: name,
    });
  }, []);

  const performPopup = useCallback((action: string) => {
    switch (action) {
      case "OPEN":
        return setIsPopupOpen(true);
      case "CLOSE":
        return setIsPopupOpen(false);
      default:
        return setIsPopupOpen(isPopupOpen);
    }
  }, []);

  useEffect(() => {
    setStudentTotal(state.studentSelected.length);
  }, [state.studentSelected.length]);

  return (
    <>
      <BlurBack open={isPopupOpen || props.loading || isLoading} />
      <div ref={popupContentRef} className={`${isPopupOpen && "z-[100]"} `}>
        <div className="absolute w-[100px] mx-auto top-1/2 left-1/2 -translate-x-1/2 z-[200]" >
          {(props.loading || isLoading) && (
            <>
              <canvas className="loader w-[100px] absolute mx-auto top-1/2"></canvas>
            </>
          )}
        </div>
        <div
          className={`fixed z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            !isPopupOpen && "hidden"
          }`}
        >
          <Popup
            label="เพิ่มสมาชิกในชั้นเรียน"
            description="เพิ่มสมาชิกภายจากการกรอกข้อมูลภายในกล่องค้นหาด้วยชื่อนักเรียนหรือรหัสนักเรียนได้เเละยังสามารถเพิ่มสามาชิกหรือนักเรียนได้มากกว่า 1 คน แต่ไม่เกิน 4 คน"
            optionalDisplay={props.popupDisplay}
            onClose={() => performPopup("CLOSE")}
            buttonFunction={[
              {
                name: "ย้อนกลับ",
                onClick: () => setIsPopupOpen(false),
              },
              {
                name: "เริ่มการประเมิน",
                disabled: studentTotal > 0,
                onClick: () => {
                  setLoading(true)
                  router.push(
                    `/profile/employee/assessments/${stateAs.assessment.id}?n=${stateAs.assessment.name}&idt=${state.studentSelected[0].id}`
                  );
                },
              },
            ]}
          />
        </div>
      </div>
      <table className="relative w-full">
        <thead className="bg-[#73408A] text-[#F7F0FA] rounded-xl">
          <tr>
            <th scope="col" className="hidden md:table-cell">
              No.
            </th>
            <th
              scope="col"
              className="text-left md:text-center px-[1.5rem] py-[0.5rem]"
            >
              ชื่อแบบประเมิน
            </th>
            <th scope="col" className="md:w-1/5">
              สัปดาห์
            </th>
            <th scope="col" className="hidden md:table-cell">
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {props.children &&
            props.children.map((val) => (
              <tr className="md:hidden" key={val.id}>
                <td
                  scope="row"
                  colSpan={2}
                  className=" cursor-pointer"
                  onClick={() => {
                    performPopup("OPEN");
                    prepareAssessment(val.topic, val.id);
                  }}
                >
                  <div className="grid grid-cols-4 mt-[0.5rem] mx-[0.5rem] py-[0.5rem] border-[1px] border-[#9B9B9B] rounded-xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                    <p className="col-span-3 text-left px-[1.25rem]">
                      {val.topic}
                    </p>
                    <p>{val.week}</p>
                  </div>
                </td>
              </tr>
            ))}
          {props.children &&
            props.children.map((val, i) => (
              <tr className="hidden md:table-row md:border-b-[1px] md:border-[#A17FB1]" key={val.id}>
                <th scope="row" className="hidden md:table-cell">
                  {(i+1)+(props.currentPage * props.limitSize)}
                </th>
                <td scope="row" className="my-[1rem]">
                  {val.topic}
                </td>
                <td scope="row">สัปดาห์ {val.week}</td>
                <td scope="row" className="hidden md:table-cell">
                  <Button 
                    label="ประเมิน"
                    style="text-[#F3F3F3] px-[1rem]"
                    onClick={() => {
                      performPopup("OPEN")
                      prepareAssessment(val.topic, val.id)
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
