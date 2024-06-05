
export default function UserPermissions(){
    return {
        admin: process.env.NEXT_ROLE_ADMIN,
        employee: process.env.NEXT_ROLE_EMPLOYEE,  
        student: process.env.NEXT_ROLE_STUDENT  
    }
}