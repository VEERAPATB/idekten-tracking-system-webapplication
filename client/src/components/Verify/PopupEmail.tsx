import React from 'react'
import Button from '../Button'
import Image from 'next/image'

interface FunctionProps{
  name: string,
  fn: () => void
}

const PopupEmail = (props: {
  label: string,
  description: React.ReactNode | string
  function?: FunctionProps
  image?: string
  loading?: React.ReactNode
}) => {
  return (
    <div className="container w-[21rem] md:w-[42rem] mx-auto bg-[#F3F3F3] rounded-md flex flex-col gap-[3rem] py-[3rem] px-[1.25rem]">
          <div className="flex flex-col gap-[2rem] mx-auto">
            {props.image && (
              <Image 
                src={props.image}
                alt='status-icon'
                width={100}
                height={100}
              />
            )}
            {props.loading && (
              props.loading
            )}
          </div>
          <div className="flex flex-col gap-[1rem]">
            <h1 className=" text-[1.25rem] font-medium text-center">
              {props.label}
            </h1>
            {props.description}
          </div>
          <div className="mx-auto mt-[2rem]">
            {props.function && (
              <Button
                label={props.function.name}
                style="px-[4.5rem] py-[0.5rem] text-[#FFFFFF] bg-[#73408A] hover:bg-[#522D62]"
                onClick={props.function.fn}
              />
            )}
          </div>
        </div>
  )
}

export default PopupEmail