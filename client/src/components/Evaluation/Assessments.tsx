import React from "react";
import FieldQuestion from "../Forms/FieldQuestion";
import Button from "../UI/Button";
import { useContext } from "react";

export type AssessmentProps = {
  capital: string;
  code: string;
  name: string;
};

type AssessmentResultProps = {
    name: string;
    id: number | string;
    question_score: [
        { [key: string] : string | string[] | number | undefined } 
    ]
}

const Assessment = (props: AssessmentProps) => {
  return (
    <div>
      <div className="field-question mx-6 mt-4 grid grid-cols-1 gap-10">
        <FieldQuestion textField={true} />
        <FieldQuestion textField={true} />
        <FieldQuestion textField={false} />
      </div>
      <div className="footer relative mt-6 mx-12 flex flex-col gap-12">
        <div className="flex gap-2 items-center font-light leading-snug">
          <input
            type="checkbox"
            name="copy-response-to-email"
            id=""
            className=" w-6 h-6"
          />
          <label htmlFor="">send me a copy of my responses</label>
        </div>
        <div className="group-button flex gap-4 justify-center">
          {/* <Button
            text="ย้อนกลับ"
            onClick={() => console.log()}
            className="relative w-[7.5rem]"
          />
          <Button
            text="ต่อไป"
            onClick={() => console.log()}
            className="relative w-[7.5rem]"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
