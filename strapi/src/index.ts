import { Strapi } from "@strapi/strapi";
import axios from "../lib/axios";
import { errors } from "@strapi/utils";

const { ApplicationError } = errors;

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi }) {
    // registration a subscriber
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],
      async afterUpdate(event) {
        const { data } = event.params;
        const userId = event.params.where.id;

        const user = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          userId,
          {
            populate: "*",
          }
        );

        console.log({
          ...data,
          Register_Student: {
            ...user.Register_Student,
          },
          Register_Employee: {
            ...user.Register_Employee,
          },
        })

        // REQUEST: Request PUT method to server for update database
        const result = await axios.put("/api/strapi/user", {
          ...data,
          Register_Student: {
            ...user.Register_Student,
          },
          Register_Employee: {
            ...user.Register_Employee,
          },
        }).then(res => console.log(res.data, res.status)).catch((res) => {
          throw new ApplicationError(res.toString())
        })
      },
      async beforeUpdate(event) {
        const { data } = event.params;
        const userId = event.params.where.id;

        const userEntity = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          userId,
          {
            populate: "*",
          }
        );

        var error = false;
        switch (userEntity.manage_role.Priority) {
          case "Student":
            if (data.Register_Employee !== undefined && data.Register_Employee !== null) {
              error = true;
            }else{
              error = false
            }
            break
          case "Employee":
            if (data.Register_Student !== undefined && data.Register_Student !== null) {
              error = true;
            }else {
              error = false;
            }
            break
        }

        // Check if there is a student component or employee student
        if (error) {
          throw new ApplicationError(
            "You can't create component with different role and 'Register' can't be empty."
          );
        }

      },
      async beforeDelete(event) {
        const userId = event.params.where.id;
        const user = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          userId
        );

        // REQUEST METHOD:DELETE delete user
        const result = await axios.delete(`/api/strapi/user?id=${user.IDT}`);
        console.log(result.data);
      },
      async beforeDeleteMany(event) {
        const usersId = event.params.where.$and[0].id.$in;

        const userEntities = await strapi.entityService.findMany(
          "plugin::users-permissions.user",
          {
            filters: {
              id: {
                $in: usersId,
              },
            },
          }
        );

        // Define IDT each entities, we found.
        const usersIdt = userEntities.map((val) => val.IDT);

        // REQUEST METHOD:DELETE delete users
        const result = await axios.delete(
          `/api/strapi/user?id=${usersIdt.toString()}`
        );
        console.log(result.data);
      },
    });
  },
};
