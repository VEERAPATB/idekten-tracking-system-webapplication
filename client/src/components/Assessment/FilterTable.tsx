'use client'

import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const FilterTable = (props: {
  onChangeWeek: (e : ChangeEvent<HTMLSelectElement>) => void,
  onChangeCourse: (e : ChangeEvent<HTMLSelectElement>) => void,
  firstFilter: {
    title: string,
    children?: string[]
  },
  secondFilter: {
    title: string,
    children?: string[]
  }
}) => {
  const searchParams = useSearchParams()

  return (
    <div className="relative w-full bg-[#3D3C3C] flex md:justify-start md:gap-[1rem] justify-between px-[1rem] py-[0.25rem] md:rounded">
      <label htmlFor="course" className="text-[#F3F3F3] text-lg my-auto hidden md:flex">คอร์ส</label>
      <select
        name="course"
        id=""
        className="w-[12rem] py-[0.5rem] px-[0.5rem] rounded"
        onChange={props.onChangeCourse}
        defaultValue={searchParams.get('c')?.toString()}
      >
        <option value="">{props.firstFilter.title}</option>
        {props.firstFilter.children && props.firstFilter.children.map((val, i) => (
          <option key={i} value={val}>{val}</option>
        ))}
      </select>
      <label htmlFor="week" className="text-[#F3F3F3] text-lg my-auto hidden md:flex">สัปดาห์</label>
      <select
        name="week"
        id=""
        className="w-[9rem] py-[0.5rem] px-[0.5rem] rounded"
        onChange={props.onChangeWeek}
        defaultValue={searchParams.get('w')?.toString()}
      >
        <option value="">{props.secondFilter.title}</option>
        {props.secondFilter.children && props.secondFilter.children.map((val, i) => (
          <option key={i} value={val}>{val}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterTable;
