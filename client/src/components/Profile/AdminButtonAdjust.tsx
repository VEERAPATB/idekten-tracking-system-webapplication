// components/MyComponent.tsx
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

function MyComponent() {
  const router = useRouter()

  const pathname = usePathname();
  const isAdmin = pathname.includes("/profile/admin");
  const isRegister = pathname === "/profile/admin/register";

  return (
    <div className="">
      {isAdmin && (
        <div className="relative">
          <button
            className={`flex items-center ${
              isRegister
                ? "text-[#D29F48]"
                : "text-white"
            } hover:text-[#D29F48]`}
            onClick={() => router.push(`${pathname}/register`)}
          >
            <Image
              alt=""
              src="/images/adjust-acc-y.svg"
              objectFit="cover"
              width={72}
              height={72}
              className={`${
                isRegister
                  ? ""
                  : "filter brightness-0 invert"
              } w-10 h-10 rounded-full overflow-hidden`}
            />
            ลงทะเบียน
          </button>
        </div>
      )}
    </div>
  );
}

export default MyComponent;