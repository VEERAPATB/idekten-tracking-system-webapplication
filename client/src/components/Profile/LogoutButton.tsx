import React from 'react'
import { signOut } from "next-auth/react"
import Image from "next/image";
function LogoutButton() {
  return (
    <button onClick={() => signOut()} className="-z-30 Logout-button flex mr-4 items-center lg:bg-[#73408A] lg:rounded-xl lg:p-1 lg:h-10">
        <Image 
            alt=""
            src="/images/logout.svg"
            width={24}
            height={24}
            className=' overflow-hidden'
          />
          <div className="hidden lg:flex items-center ml-2 lg:text-l lg:text-[#F3F3F3] font-normal">
            ออกจากระบบ
          </div>
    </button>
  )
}

export default LogoutButton