
export default ({ env }) => ({
    "users-permissions": {
        config: {
            register: {
                allowedFields: [
                    "id",
                    "Register_Employee",
                    "Register_Student",
                    "IDT",
                    "classes",
                    "category_branch",
                    "manage_role"
                ]
            }
        }
    }
})