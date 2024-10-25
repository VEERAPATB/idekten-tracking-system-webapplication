import { errors } from '@strapi/utils'
import axios from '../../../../../lib/axios'

const { ApplicationError } = errors 

export default {
    async afterCreate(event){
        const { data } = event.params
        const role = await strapi.db.query('api::manage-role.manage-role').findOne({
            select: ['id'],
            where: {
                Name: data.Name
            }
        })

        const result = await axios.post('/api/strapi/role',{
            id: role.id,
            ...data
        })
        console.log(result.data)
    },
    async afterUpdate(event){
        const { data } = event.params
        console.log(data)
        const result = await axios.put('/api/strapi/role',{
            ...data
        })
        console.log(result.data)
    },
    async afterDelete(event){
        const entityId = event.params.where.id
        console.log(entityId)
        const result = await axios.delete(`/api/strapi/role?id=${entityId}`)
        console.log(result.data)
    },
    async afterDeleteMany(event){
        const entitiesId = event.params.where.$and[0].id.$in
        console.log(entitiesId.toString())
        const result = await axios.delete(`/api/strapi/role?id=${entitiesId.toString()}`)
        console.log(result.data)
    },
    
    async beforeUpdate(event){
        const { data } = event.params

        const roleEntity = await strapi.entityService.findOne('api::manage-role.manage-role', data.id, {
            populate: '*'
        })
        
        // Check previous role compare update role
        if(roleEntity.Priority !== data.Priority) throw new ApplicationError("You can't change 'Priority', it affect to data in database. Please create a new one if you want to change 'Priority'.")
    },
    async beforeDelete(event){
        const roleId = event.params.where.id

        // Check user that related to roles, we want to delete
        const userEntities = await strapi.db.query('plugin::users-permissions.user').findMany({
            where: {
                manage_role: roleId
            }
        })
        if(userEntities.length > 0) throw new ApplicationError("Please, remove or change users which related to roles, before delete roles.")
    },
    async beforeDeleteMany(event){
        const rolesIds = event.params.where.$and[0].id.$in
        
        // Check user that related to roles, we want to delete
        const userEntities = await strapi.db.query('plugin::users-permissions.user').findMany({
            where: {
                manage_role: rolesIds
            }
        })
        if(userEntities.length > 0) throw new ApplicationError("Please, remove or change users which related to roles, before delete roles.")
    }
}