// components/MyComponent.tsx
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

function MyComponent() {
  const pathname = usePathname();
  const isEmployee = pathname.includes("/profile/employee");
  const isAdmin = pathname.includes("/profile/admin");
  const isStudent = pathname === "/profile/student";
  const isDashboard = pathname === "/profile/student/dashboard";
  const isAssessment = pathname === "/profile/employee/assessments";
  const isEditStudent = pathname === "/profile/editStudent";
  const isEditEmployee = pathname === "/profile/editEmployee";
  const isAssessmentStatus = pathname === "/profile/admin/assessments-status";
  const isRegisterStudent = pathname === "/profile/admin/register/student";
  const isRegisterEmployee = pathname === "/profile/admin/register/employee";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="flex gap-16 justify-between">
      {isAdmin && (
        <a
          href="/profile/admin/assessments-status"
          className={`flex items-center ${
            isRegisterStudent || isRegisterEmployee ? "text-white" : ""
          } text-[#D29F48] hover:text-[#D29F48]`}
        >
          <Image
            alt=""
            src="/images/tracking-assessment-y.svg"
            objectFit="cover"
            width={72}
            height={72}
            className={`${
              isRegisterStudent || isRegisterEmployee
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
