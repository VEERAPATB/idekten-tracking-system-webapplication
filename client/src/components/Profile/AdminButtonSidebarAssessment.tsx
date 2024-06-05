// components/MyComponent.tsx
import { usePathname } from "next/navigation";
import Image from "next/image";

function MyComponent() {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/profile/admin");
  const isRegister = pathname === "/profile/admin/register"
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
            width={72}
            height={72}
            className={`${
              isRegister
                ? "filter brightness-0 invert"
                : ""
            } w-10 h-10 rounded-full overflow-hidden`}
          />
          ระบบติดตามการประเมิน
        </a>
      )}
    </div>
  );
}

export default MyComponent;
