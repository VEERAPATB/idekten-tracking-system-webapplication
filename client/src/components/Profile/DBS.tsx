// components/MyComponent.tsx
import { usePathname } from "next/navigation";
import Image from "next/image";
import path from "path";

function MyComponent() {
  
  const pathname = usePathname();
  const isStudent = pathname === "/profile/student";
  const isEmployee = pathname.includes("/profile/employee");
  const isAssessment = pathname === "/profile/employee/assessments";
  const isEditStudent = pathname === "/profile/editStudent";
  const isEditEmployee = pathname === "/profile/editEmployee";
  const isAssessmentStatus = pathname === "/profile/admin/assessments-status";
  const isRegisterStudent = pathname === "/profile/admin/register/student";
  const isRegisterEmployee = pathname === "/profile/admin/register/employee";
  const isDashboard = pathname === "/profile/student/dashboard";

  return (
    <div>
      {isDashboard &&(
        <button
          disabled
          className={`gap-1 text-xs flex items-center text-[#D29F48] hover:text-[#D29F48]`}
        >
          <Image
            alt=""
            src="/images/overall-y.svg"
            objectFit="cover"
            width={72}
            height={72}
            className="w-10 h-10 rounded-full overflow-hidden"
          />
          ภาพรวม
        </button>
      )}
      {isEmployee && (
        <a
          href="/profile/employee/assessments"
          className={`gap-1 text-xs flex items-center ${
            isAssessment ? "text-[#D29F48]" : "text-white"
          } hover:text-[#D29F48]`}
        >
          <Image
            alt=""
            src="/images/assessment-y.svg"
            objectFit="cover"
            width={72}
            height={72}
            className={`${isEmployee && !isAssessment ? "filter brightness-0 invert" : ""} w-10 h-10 rounded-full overflow-hidden`}
          />
          แบบประเมิน
        </a>
      )}
    </div>
  );
}

export default MyComponent;
