"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import FieldQuestion from "@/components/Assessment/Evaluation/FieldQuestion";
import InfoBar from "@/components/Assessment/Evaluation/InfoBar";
import Button from "@/components/Button";
import {
  FormAssessmentProps,
  PageProps,
  StudentScore,
} from "@/types/next-general";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import BlurBack from "@/components/BlurBack";
import {
  StudentActionKind,
  StudentContext,
} from "@/lib/context/StudentContext";
import PopupDanger from "@/components/PopupDanger";
import PopupSend from "@/components/Assessment/Evaluation/PopupSend";
import { Suspense } from "react";
import { AxiosError } from "axios";

const Page = (props: PageProps) => {
  const { replace } = useRouter();
  const axiosAuth = useAxiosAuth();
  const pathname = usePathname();
  const router = useRouter()
  const searchParams = useSearchParams();
  const { state, dispatch } = useContext(StudentContext);
  const [isClient, setClient] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const isPasting = useRef(false)

  const assessmentId = props.params.selected_form;
  const totalStudent = state.studentSelected.length;

  // Use for pull page student from URL
  const [pageStudent, setPageStudent] = useState(
    Number(props.searchParams?.p || 1)
  );
  // Use for set the correct student index
  const [studentIndex, setStudentIndex] = useState(pageStudent - 1);

  // Popup 2 button -> Cancel, Send Assessment
  const [warning, setWarning] = useState(false);
  const [warningBack, setWarningBack] = useState(false);

  // Handle Data from server
  const [form, setForm] = useState<FormAssessmentProps | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle data to send to server
  const assessmentScore = useRef<{ student: StudentScore | undefined }>({
    student: undefined,
  });
  const [feedback, setFeedback] = useState<{detail?: string, behavior?: string}>({
    detail: undefined,
    behavior: undefined
  })
  const [refresh, setRefresh] = useState(false)

  const createPageURL = (pageNumber: number, studentId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("p", pageNumber.toString());
    params.set("idt", studentId.toString());
    return `${pathname}?${params.toString()}`;
  };

  const fetchAssessment = async () => {
    setLoading(true)
    try {
      const response = await axiosAuth.get(
        `/api/form-assessment/${assessmentId}`
      );
      if(response.status === 200 && response.status < 300){
        setForm({ ...response.data, ref: assessmentScore });
      }
    } catch (error) {
      console.error(`Error : ${error}`);
    }
    setLoading(false)
  };

  const performCancelAssessment = () => {
    replace("/profile/employee/assessments");
    dispatch({
      type: StudentActionKind.CLEAR,
    });
  };

  const performRadioScore = useCallback((id: number, score: number) => {
    if (!assessmentScore.current.student) return;

    const isValid = assessmentScore.current.student?.score.findIndex(
      (val) => val.id === id
    );
    if (isValid !== -1) {
      assessmentScore.current.student.score[isValid].value = score;
    } else {
      assessmentScore.current.student.score.push({
        id: id,
        value: score,
      });
    }
  }, []);

  const performSendAssessment = async () => {

    if(!feedback.detail || !feedback.behavior) return

    if(feedback.detail?.length < 10 || feedback.behavior?.length < 10){
      return alert('กรุณากรอกข้อมูล Feedback ให้มีความยาวมากกว่า 10 ตัวอักษร')
    }

    try {
      const response = await axiosAuth.post(
        `/api/form-assessment/${assessmentId}`,
        {
          student: assessmentScore.current.student?.id,
          fields: assessmentScore.current.student?.score,
          feedback_detail: feedback.detail,
          feedback_behavior: feedback.behavior,
        }
      );
      if (totalStudent === pageStudent) {
        router.push('/profile/employee/assessments')
        dispatch({
          type: StudentActionKind.CLEAR,
        });
      } else {
        setStudentIndex(studentIndex + 1);
        setPageStudent(pageStudent + 1);
        setLoading(true)
        const params = new URLSearchParams(searchParams)
        params.set('p', (pageStudent+1).toString())
        setRefresh(prev => !prev)
        router.push(`${pathname}?${params}`)
      }
    } catch (error) {
      const e: AxiosError = error
      if(e.response?.status && e.response.status === 500){
        alert("Something went wrong. contact support or try again later")
      }else{
        alert("ไม่พบรายชื่่อนักเรียนภายในคอร์ส โปรดตรวจสอบนักเรียนของคุณอีกครั้งก่อนทำการประเมิน")
      }
      console.error(`Error : ${error}`);
      router.push('/profile/employee/assessments')
    }
    setWarning(false)
    setLoading(false)
  };

  const clearScore = () => {
    assessmentScore.current.student = {
      id: state.studentSelected[studentIndex]?.id,
      score: [],
    };
  };

  const clearFeedback = () => {
    setFeedback({ detail: undefined, behavior: undefined})
  };

  // Check don't refresh every time
  useEffect(() => {
    if (!isClient) return;
    const nextStudentId = state.studentSelected[studentIndex].id;
    replace(createPageURL(pageStudent, nextStudentId));
  }, [pageStudent, studentIndex]);

  // Fetch data
  useEffect(() => {
    formRef.current?.reset()
    fetchAssessment();
  }, [refresh]);
  
  useEffect(() => {
    clearScore();
    clearFeedback()
  }, [studentIndex]);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <Suspense fallback>
      {isLoading && (
        <div className="">
          <BlurBack open />
          <div className=" absolute w-[100px] mx-auto top-1/2 left-1/2 -translate-x-1/2  z-[100]">
            <canvas className=" absolute loader w-[100px] mx-auto"></canvas>
          </div>
        </div>
      )}
      <div>
        <BlurBack open={warning || warningBack} />
        <div className=" fixed z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {warning && (
            <PopupSend 
              head="การส่งแบบประเมิน"
              description='เมื่อทำการกดปุ่ม "ยืนยันแล้ว" ระบบจะทำการส่งแบบประเมินทันที และจะไม่สามารถแก้ไขข้อมูลได้เมื่อทำการส่งไปแล้ว ต้องการยืนยันหรือไม่?'
              function={{
                name: "ยืนยัน",
                function: () => {
                  performSendAssessment()
                }
              }}
              onClose={() => setWarning(false)}
            />
          )}
          {warningBack && (
            <PopupDanger 
              head='การยกเลิกการประเมิน'
              description="เมื่อทำการกดปุ่ม 'ยืนยัน' จะทำการยกเลิกการประเมินที่ทำอยู่ ณ ปัจจุบันของ เด็กนักเรียน ต้องการจะยกเลิกหรือไม่? หมายเหตุเด็กนักเรียนที่ได้ทำการส่งแบบประเมินไปก่อนหน้านี้ จะไม่ถูกยกเลิก"
              onClose={() => setWarningBack(false)}
              function={{
                name: "ยืนยัน",
                function: () => performCancelAssessment()
              }}
            />
          )}
        </div>
        <div className="relative w-full my-8 mb-12 flex flex-col gap-[1.5rem]">
          <InfoBar {...props} />
          <div className="mx-[1.5rem]">
            <form
              className="flex flex-col gap-[1.5rem]"
              onSubmit={(e) => {
                e.preventDefault();
                setWarning(true);
              }}
              ref={formRef}
            >
              {form?.Fields &&
                form.Fields.map((val) => (
                  <FieldQuestion
                    key={val.id}
                    {...val}
                    handleScore={performRadioScore}
                    trigger={refresh}
                  />
                ))}
              <div className="relative feedback text-[#3D3C3C] md:w-[57rem] mx-auto bg-[#FFF] py-[1.5rem] px-[1rem] flex flex-col gap-[1rem] rounded-sm shadow-[10px_10px_10px_0px_rgba(0,0,0,0.25)]">
                <h3 className=" font-medium text-[#D64F4F] w-2/3">
                  รบกวนพิมพ์ Feedback ของผู้เรียนตามนโยบายของผู้บริหาร
                </h3>
                <div className=" flex flex-col gap-[0.5rem]">
                  <h4 className=" font-medium">Feedback/Detail</h4>
                  <textarea
                    name=""
                    id=""
                    rows={4}
                    value={feedback.detail}
                    onPaste={(e) => {
                      isPasting.current = true
                      const text = e.clipboardData.getData('text/plain')
                      setFeedback({...feedback, detail: text})
                    }}
                    onChange={(e) => {
                      console.log(e.target.value)
                      if(isPasting.current) return isPasting.current = false
                      setFeedback({
                        ...feedback, detail: e.target.value
                      })
                    }}
                    required
                    placeholder="ข้อมูลข้อเสนอแนะ..."
                    className=" resize-none outline-none p-[0.5rem] bg-[#F3F3F3] border-[1px] border-[#9B9B9B] rounded w-full"
                  ></textarea>
                </div>
                <div className=" flex flex-col gap-[0.5rem]">
                  <h4 className=" font-medium">Feedback/Behavior</h4>
                  <textarea
                    name=""
                    id=""
                    rows={4}
                    value={feedback.behavior}
                    onPaste={(e) => {
                      isPasting.current = true
                      setFeedback({
                        ...feedback, behavior: e.clipboardData.getData('text/plain')
                      })
                    }}
                    onChange={(e) => {
                      console.log(e.target.value)
                      if(isPasting.current) return isPasting.current = false
                      setFeedback({
                        ...feedback, behavior: e.target.value
                      })
                    }}
                    required
                    placeholder="ข้อมูลข้อเสนอแนะ..."
                    className=" resize-none outline-none p-[0.5rem] bg-[#F3F3F3] border-[1px] border-[#9B9B9B] rounded w-full"
                  ></textarea>
                </div>
              </div>
              <div className="md:flex justify-end mx-[9rem] gap-[1.5rem] hidden">
                <p className=" text-[#D64F4F] my-auto">
                  ไม่สามารถกลับมาแก้ไขได้ โปรดตรวจสอบอีกครั้ง
                </p>
                <div className="flex gap-[1.5rem]">
                  <div>
                    <Button
                      label="ยกเลิก"
                      border={true}
                      style="text-[#73408A] hover:border-[#522D62] hover:text-[#522D62] px-[4rem] py-[0.5rem]"
                      onClick={() => setWarningBack(true)}
                    />
                  </div>
                  <div>
                    <Button
                      label="ส่งแบบประเมิน"
                      type="submit"
                      border={true}
                      style={`bg-[#73408A] text-[#F3F3F3] hover:bg-[#522D62] px-[2rem] py-[0.5rem]`}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[1.5rem] mt-[4rem] md:hidden">
                <p className=" text-[#D64F4F] text-center">
                  ไม่สามารถกลับมาแก้ไขได้ โปรดตรวจสอบอีกครั้ง
                </p>
                <div className="grid grid-cols-2 gap-[1rem] mx-[2rem]">
                  <Button
                    label="ยกเลิก"
                    border={true}
                    style="text-[#73408A] hover:border-[#522D62] hover:text-[#522D62] py-[0.5rem]"
                    onClick={() => setWarningBack(true)}
                  />
                  <Button
                    label="ส่งแบบประเมิน"
                    type="submit"
                    border
                    style={`bg-[#73408A] text-[#F3F3F3] hover:bg-[#522D62] py-[0.5rem]`}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
