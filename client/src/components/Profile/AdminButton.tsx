// components/MyComponent.tsx
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

function MyComponent() {
  const router = useRouter()

  const pathname = usePathname();
  const isAdmin = pathname.includes("/profile/admin");
  const isRegister = pathname === "/profile/admin/register";

  return (
    <div className="flex gap-16 justify-between">
      {isAdmin && (
        <a
          href="/profile/admin/assessments-status"
          className={`flex items-center ${
            isRegister ? "text-white" : ""
          } text-[#D29F48] hover:text-[#D29F48]`}
        >
          <Image
            alt=""
            src="/images/tracking-assessment-y.svg"
            objectFit="cover"
            width={72}
            height={72}
            className={`${
                isRegister ? "filter brightness-0 invert" : ""
            } w-10 h-10 rounded-full overflow-hidden`}
          />
          ระบบติดตามการประเมิน
        </a>
      )}
      {isAdmin && (
        <div className="relative">
          <button
            className={`flex items-center ${
              isRegister
                ? "text-[#D29F48]"
                : "text-white"
            } hover:text-[#D29F48]`}
            onClick={() => router.push(`/profile/admin/register`)}
          >
            <Image
              alt=""
              src="/images/adjust-acc-y.svg"
              objectFit="cover"
              width={72}
              height={72}
              className={`${
                isRegister ? "" : "filter brightness-0 invert"
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
