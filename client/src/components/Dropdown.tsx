'use client'

import React, { ChangeEvent } from "react";

const Dropdown = (props: {
  label: string;
  children: string[];
  style?: string;
  styleOption?: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  default?: string
  hiddenFirst?: boolean
}) => {
  return (
    <div className=" flex flex-col gap-[1rem] ">
      <select defaultValue={props.default} onChange={props.onChange} name={`${props.label}`} className={`${props.style} outline-none border-b-[2px] border-b-[#73408A] py-[0.5rem] px-[0.5rem] rounded`}>
        <option className={`bg-[#935eac] ${props.hiddenFirst && 'hidden'} `} value={""}>{props.label}</option>
        {props.children.length > 0 && props.children.map((opt, i) => (
            <option className={`${props.styleOption} bg-[#935eac] py-[3rem]`} value={opt} key={i}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
