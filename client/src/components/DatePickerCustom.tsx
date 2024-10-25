import React, { ChangeEvent } from "react";

const DatePickerCustom = (props: {
  date: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string
}) => {
  return (
    <div className="flex flex-col w-full relative">
      <label htmlFor="birthday" className="font-medium text-sm text-[#73408A]">
        {props.label}
      </label>
      <input
        onChange={props.onChange}
        type="date"
        id="birthday"
        className=" border-b-[1px] border-b-[#313131] pt-[0.25rem] outline-none pb-[0.25rem] focus:border-b-[#73408A]"
      />
    </div>
  );
};

export default DatePickerCustom;
