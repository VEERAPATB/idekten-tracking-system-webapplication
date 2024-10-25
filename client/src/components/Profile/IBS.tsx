// components/MyComponent.tsx
import { usePathname } from "next/navigation";
import Image from "next/image";

function MyComponent() {
  const pathname = usePathname();
  const isStudent = pathname === "/profile/student";
  const isEmployee = pathname === "/profile/employee";
  const isDashboard = pathname === "/profile/student/dashboard";
  const isAssessment = pathname === "/profile/employee/assessments";
  const isEditStudent = pathname === "/profile/editStudent";
  const isEditEmployee = pathname === "/profile/editEmployee";

  return (
    <div>
      {(isStudent || isDashboard || isEditStudent) && (
        <a
          href="/profile/student"
          className={`${isDashboard? "text-white":""} ${isStudent? "text-[#D29F48]":"text-white"}  gap-1 text-xs flex items-center hover:text-[#D29F48]`}
        >
          <Image
            alt=""
            src="/images/icon-information.svg"
            objectFit="cover"
            width={72}
            height={72}
            className={`${
              isStudent ? "" : "filter brightness-0 invert" // filter brightness-0 invert คือทำให้เป็นสีขาว
            } w-10 h-10 rounded-full overflow-hidden`}
          />
          ข้อมูลส่วนตัว
        </a>
      )}
      {(isEmployee || isAssessment || isEditEmployee) && (
        <a
          href="/profile/employee"
          className={`${isAssessment? "text-white":""} ${isEmployee? "text-[#D29F48]":"text-white"} gap-1 text-xs flex items-center hover:text-[#D29F48]`}
        >
          <Image
            alt=""
            src="/images/icon-information.svg"
            objectFit="cover"
            width={72}
            height={72}
            className={`${
              isEmployee ? "" : "filter brightness-0 invert"
            } w-10 h-10 rounded-full overflow-hidden`}
          />
          ข้อมูลส่วนตัว
        </a>
      )}
    </div>
  );
}

export default MyComponent;
