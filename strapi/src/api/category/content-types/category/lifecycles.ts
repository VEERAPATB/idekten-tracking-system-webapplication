import axios from '../../../../../lib/axios'
import { errors } from '@strapi/utils'

const { ApplicationError } = errors

export default {
    async afterCreate(event){
        const { data } = event.params;
        const branch = await strapi.db.query('api::category.category').findOne({
            select: ['id','Name_category','Description','createdAt','updatedAt'],
            where: { Name_category: data.Name_category },
            populate: { users: true }
        })
        if(branch === null) return

        const result = await axios.post(`/api/strapi/branch`, {
            ...branch
        })
        console.log(result.data)
    },
    async afterDelete(event){
        const entityId = event.params.where.id

        // Request method:delete to server
        const result = await axios.delete(`/api/strapi/branch?id=${entityId}`)
        console.log(result.data)
    },
    async afterDeleteMany(event){
        const entitiesId = event.params.where.$and[0].id.$in
        
        // Request method:delete to server
        const result = await axios.delete(`/api/strapi/branch?id=${entitiesId.toString()}`)
        console.log(result.data)
    },
    async afterUpdate(event){
        const { data } = event.params
        // Request method:put to server
        const result = await axios.put(`/api/strapi/branch`,{
            ...data
        })
        console.log(result.data)
    },

    async beforeDelete(event){
        const branchId = event.params.where.id
        
        const branchEntity = await strapi.entityService.findOne('api::category.category', branchId, {
            populate: {
                users: true
            }
        })
        const studentUsers = branchEntity.users
        if(studentUsers.length > 0) throw new ApplicationError(`You can't delete 'Branch' if there has 'User' relation.`)
        
        const classEntities = await strapi.db.query('api::class.class').findMany({
            where:{
                category_branch:{
                    id: branchId
                }
            },
            populate: {
                category_branch: true
            }
        })
        const branchInClass = classEntities.length
        if(branchInClass > 0) throw new ApplicationError(`You can't delete 'Branch' if 'Class' has relation to it.`)
    },
    async beforeDeleteMany(event){
        const branchIds = event.params.where.$and[0].id.$in

        const branchEntities = await strapi.db.query('api::category.category').findMany({
            where:{
                id: branchIds
            },
            populate:{
                users: true
            }
        })
        branchEntities.map(entity => {
            var users = entity.users
            if(users.length > 0) throw new ApplicationError(`You can't delete 'Branch'(${entity.id}) if there has 'User' relation.`)
        })

        const classEntities = await strapi.db.query('api::class.class').findMany({
            where:{
                category_branch:{
                    id: branchIds
                }
            },
            populate: {
                category_branch: true
            }
        })
        const branchInClass = classEntities.length
        if(branchInClass > 0) throw new ApplicationError(`You can't delete 'Branch' if 'Class' has relation to it.`)
    }
};