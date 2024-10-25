'use client'

import React from 'react'

const BlurBack = (props: { open: boolean}) => {
  return (
    <canvas className={`fixed w-full left-0 bg-[#313131] h-full top-0 opacity-50 z-[100] ${!props.open && 'hidden'}`}></canvas>
  )
}

export default BlurBack