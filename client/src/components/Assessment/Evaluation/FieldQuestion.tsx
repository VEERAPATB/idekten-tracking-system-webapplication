"use client";

import { FieldQuestionProps } from "@/types/next-general";
import React, { ChangeEvent, useEffect, useState } from "react";

interface FieldTrigger extends FieldQuestionProps{
    trigger: boolean
}

const FieldQuestion = (props: FieldTrigger) => {
    const [value,setValue] = useState<number | undefined>()

    const fieldId = props.id

    const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
        if(!props.handleScore) return 
        props.handleScore(fieldId, Number(e.target.value)) 
        setValue(Number(e.target.value))
    }

    useEffect(() => {
      setValue(undefined)
    }, [props.trigger])

  return (
    <div className="relative w-full md:w-[57rem] mx-auto bg-[#FFF] rounded-sm flex flex-col gap-[1rem] px-[1rem] py-[1.5rem] shadow-[10px_10px_10px_0px_rgba(0,0,0,0.25)]">
      <h1 className="font-medium">{props.topic}</h1>
      <p className=" text-center">{props.description}</p>
      {props.question.map((val, i) => (
        <p key={i} className=" text-center">
          {val}
        </p>
      ))}
      <div className="flex gap-[2rem] text-lg justify-center">
        <div className="flex gap-[0.5rem]">
          <input
            type="radio"
            className="w-[1.5rem]"
            required
            value={3}
            checked={value === 3}
            onChange={handleRadio}
            name={`${props.id.toString()}${props.topic}`}
            id={`${props.id.toString()}${props.topic}3`}
          />
          <label htmlFor={`${props.id.toString()}${props.topic}3`}>3</label>
        </div>
        <div className="flex gap-[0.5rem]">
          <input
            type="radio"
            className="w-[1.5rem]"
            required
            value={2}
            checked={value === 2}
            onChange={handleRadio}
            name={`${props.id.toString()}${props.topic}`}
            id={`${props.id.toString()}${props.topic}2`}
          />
          <label htmlFor={`${props.id.toString()}${props.topic}2`}>2</label>
        </div>
        <div className="flex gap-[0.5rem]">
          <input
            type="radio"
            className="w-[1.5rem]"
            required
            value={1}
            checked={value === 1}
            onChange={handleRadio}
            name={`${props.id.toString()}${props.topic}`}
            id={`${props.id.toString()}${props.topic}1`}
          />
          <label htmlFor={`${props.id.toString()}${props.topic}1`}>1</label>
        </div>
      </div>
    </div>
  );
};

export default FieldQuestion;
