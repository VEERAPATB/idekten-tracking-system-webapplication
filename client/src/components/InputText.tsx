import React, { ChangeEvent } from "react";

const InputText = (props: {
  label: string;
  type: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; 
  value: string | number
}) => {
  return (
    <div className="relative z-0 w-full">
      <input
        type={props.type}
        className="block pt-[0.8rem] pb-[0.25rem] px-0 w-full text-[1rem] bg-transparent border-0 border-b-[1px] border-[#313131] appearance-none focus:outline-none focus:ring-0 focus:border-[#73408A] peer"
        placeholder={props.placeholder || ""}
        required={props.required || false}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        autoComplete="off"
      />
      <label
        htmlFor="email-input"
        className="absolute text-sm text-[#2d1936] duration-300 font-medium transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#73408A] peer-placeholder-shown:scale-125 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[#313131] peer-focus:scale-100 peer-focus:font-medium peer-focus:-translate-y-6"
      >
        {props.label}
      </label>
    </div>
  );
};

export default InputText;
