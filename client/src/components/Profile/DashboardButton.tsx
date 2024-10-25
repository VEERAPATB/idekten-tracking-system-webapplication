// components/MyComponent.tsx
import { usePathname } from "next/navigation";
import Image from "next/image";

function MyComponent() {
  const pathname = usePathname();
  const isEmployee = pathname.includes("/profile/employee");
  const isStudent = pathname === "/profile/student";
  const isDashboard = pathname === "/profile/student/dashboard";
  const isAssessment = pathname === "/profile/employee/assessments";
  const isEditStudent = pathname === "/profile/editStudent";
  const isEditEmployee = pathname === "/profile/editEmployee";
  const isAssessmentStatus = pathname === "/profile/admin/assessments-status";
  const isRegisterStudent = pathname === "/profile/admin/register/student";
  const isRegisterEmployee = pathname === "/profile/admin/register/employee";

  return (
    <div>
      {isDashboard &&(
        <button
          disabled
          className={`flex items-center ml-16 ${
            isEmployee || isEditStudent || isEditEmployee ? "hidden" : ""
          } text-[#D29F48] hover:text-[#D29F48]`}
        >
          <Image
            alt=""
            src="/images/overall-y.svg"
            objectFit="cover"
            width={72}
            height={72}
            className={`w-10 h-10 rounded-full overflow-hidden`}
          />
          ภาพรวม
        </button>
      )}
      {isEmployee &&(
        <a
          href="/profile/employee/assessments"
          className={`flex items-center ml-16 ${  
            isAssessment ? "text-[#D29F48]" : "text-white"
          } hover:text-[#D29F48]`}
        >
          <Image
            alt=""
            src="/images/assessment-y.svg"
            objectFit="cover"
            width={72}
            height={72}
            className={`${
              isEmployee && !isAssessment ? "filter brightness-0 invert" : ""
            } w-10 h-10 rounded-full overflow-hidden`}
          />
          แบบประเมิน
        </a>
      )}
    </div>
  );
}

export default MyComponent;
