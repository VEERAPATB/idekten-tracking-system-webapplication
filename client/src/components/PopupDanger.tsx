'use client'

import React from 'react'
import Button from './Button'
import Image from 'next/image'

interface FunctionProps{
  name: string,
  function: () => void
}

const PopupDanger = (props: {
  head: string,
  description: string,
  onClose: () => void
  function: FunctionProps
  style?: string
}) => {
  return (
    <div className={`relative flex flex-col md:gap-[1rem] gap-[2.5rem] bg-[#FFFFFF] border-[1px] rounded-[0.5rem] w-[20rem] md:w-[37.5rem] mx-auto p-[1.5rem] ${props.style}`}>
        <div className=' absolute right-[1.5rem] cursor-pointer' onClick={props.onClose}>
          <Image 
            src={'/images/cross-line.svg'}
            alt='exit'
            width={24}
            height={24}
          />
        </div>
        <div className='flex items-center gap-[0.5rem]'>
          <Image 
            src={'/images/danger.png'}
            alt='danger'
            width={26}
            height={26}
          />
          <h4 className=' font-medium text-[1.25rem] '>{props.head}</h4>
        </div>
        <p className='text-center md:text-left'>{props.description}</p>
        <div className='flex gap-[0.5rem] md:justify-end'>
            <div className='flex w-full gap-[0.5rem] md:w-auto'>
              <div className='w-full md:w-auto'>
                <Button 
                    label='ยกเลิก'
                    style='border-[1px] border-[#9B9B9B] font-medium px-[0.75rem] md:py-[0.2rem] py-[0.5rem]'
                    onClick={props.onClose}
                />
              </div>
              <div className='w-full md:w-auto'>
                <Button 
                    label={props.function.name}
                    style='border-[#9B9B9B] border-[1px] text-[#FFFFFF] font-medium bg-[#D64F4F] md:py-[0.2rem] px-[0.75rem] py-[0.5rem]'
                    onClick={props.function.function}
                />
              </div>
            </div>
        </div>
    </div>
  )
}

export default PopupDanger