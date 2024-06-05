"use client"
import React, { useState, useEffect, ChangeEvent,SyntheticEvent  } from 'react';
import Slider from '@mui/material/Slider';
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

export default function NonLinearSlider(prop: { id?: number ,change:(e:number)=>void}) {

  const [Data, setData] = useState<{
    min: number | 1;
    max: number | 1;
    defaultValue: number | 1;
    marks: {
      value: number,
      label: string,
      id: number,
    }[];
  }>({
    min: 1,
    max: 1,
    defaultValue: 1,
    marks: []
  });

  const axiosAuth = useAxiosAuth();
  useEffect(() => {
    const handleClick = async () => {
      try {
        const result = await axiosAuth.get(`/api/slider-details/${prop.id}`);
        console.log(result.data);
        setData({
          ...Data,
          min: result.data.min,
          max: result.data.max,
          defaultValue: result.data.defaultValue,
          marks: result.data.marks,
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleClick();
  }, []);

  const [value, setValue] = React.useState<number>(Data.defaultValue);
  useEffect(() => {
    setValue(Data.defaultValue);
  }, [Data.defaultValue]);
  
  console.log(Data)
  const handleChange = (event: SyntheticEvent | Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  const handleCommit = (event: SyntheticEvent | Event, newValue: number | number[]) => {
    setTimeout(() => {
      const matchedMark = Data.marks.find(mark => mark.value === newValue);
      if (matchedMark && matchedMark.id !== undefined ) {
        console.log("Matched id:", matchedMark.id);
        prop.change(matchedMark.id);
      }
    }, 500); 
  };
  
  return (
    <div className='w-5/6 '>
      <Slider
        min={Data.min}
        max={Data.max}
        defaultValue={Data.defaultValue}
        marks={Data.marks}
        value={value}
        step={1}
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        color='secondary'
        aria-labelledby="non-linear-slider"
      />
    </div>
  );
}