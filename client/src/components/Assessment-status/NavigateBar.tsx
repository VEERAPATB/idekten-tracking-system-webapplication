"use client";

import React from "react";

interface NavigateBarProps{
    list: {
        name: string,
        fn: () => void,
        enabled: boolean
    }[]
}

const NavigateBar = (props: NavigateBarProps) => {
  return (
    <ul className="flex gap-[1rem] text-center items-center font-medium">
        {props.list.map((val, i) => (
            <li key={i}
                className={`px-[1.4rem] pb-2 ${
                val.enabled && "border-b-[3px] border-[#73408A]"
                }`}
                onClick={val.fn}
            >
                {val.name}
            </li>
        ))}
    </ul>
  );
};

export default NavigateBar;
