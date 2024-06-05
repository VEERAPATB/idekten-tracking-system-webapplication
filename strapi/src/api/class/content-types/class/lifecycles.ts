import axios from '../../../../../lib/axios'
import { errors } from '@strapi/utils'

const { ApplicationError } = errors;

export default {
    async afterCreate(event){
        const { data } = event.params;
        const classes = await strapi.db.query('api::class.class').findOne({
            select: ['id'],
            where: {
                Name_Class: data.Name_Class
            }
        })
        if(classes === null) return
    
        const studentsId:number[] = data.users_permissions_users.connect.map(val => val.id)
        const students = await strapi.db.query('plugin::users-permissions.user').findMany({
            select: ['IDT'],
            where: {
                id: studentsId
            }
        })
        
        const result = await axios.post('api/strapi/class',{
            id: classes.id,
            ...data,
            users_permissions_users:{
                connect: students
            }
        })
        console.log(result.data)
    },
    async afterUpdate(event){
        const { data } = event.params;    
        const studentRelation = data.users_permissions_users
    
        const studentConnectIdt = await strapi.entityService.findMany('plugin::users-permissions.user', {
            fields: ['IDT'],
            filters: {
                id: studentRelation.connect.map(val => val.id)
            }
        })
        const studentDisconnectIdt = await strapi.entityService.findMany('plugin::users-permissions.user', {
            fields: ['IDT'],
            filters:{
                id: studentRelation.disconnect.map(val => val.id)
            }
        })
    
        // Request method:put to server
        const result = await axios.put(`/api/strapi/class`,{
            ...data,
            users_permissions_users:{
                connect: studentConnectIdt,
                disconnect: studentDisconnectIdt
            }
        })
        console.log(result.data)
    },
    async afterDelete(event){
        const entityId = event.params.where.id
    
        // Request method:delete to server
        const result = await axios.delete(`/api/strapi/class?id=${entityId}`)
        console.log(result.data)
    },
    async afterDeleteMany(event){
        const entitiesId = event.params.where.$and[0].id.$in
        
        // Request method:delete to server
        const result = await axios.delete(`/api/strapi/class?id=${entitiesId.toString()}`)
        console.log(result.data)
    },
    async beforeCreate(event){
        const { data } = event.params
        const branchRelation = data.category_branch
        const courseRelation = data.category_course
        const userRelation = data.users_permissions_users

        // Relation with Course and Branch
        if(courseRelation.connect.length < 1) throw new ApplicationError("You must insert at least one 'Course' relation.")
        if(branchRelation.connect.length < 1) throw new ApplicationError("You must insert at least one 'Branch' relation.")
    
        // Check user roles
        const usersId = userRelation.connect.map(val => val.id)
        const userEntities = await strapi.db.query('plugin::users-permissions.user').findMany({
            where: {
                id: usersId
            },
            populate: true
        })
        userEntities.map(val => {
            if(val.Register_Student === null) throw new ApplicationError("You couldn't insert 'Employee' relation to 'Class'.")
        })
    },
    async beforeUpdate(event){
        const { data } = event.params
        const courseRelation = data.category_course
        const branchRelation = data.category_branch

        if(courseRelation.disconnect.length > 0 && courseRelation.connect.length < 1) throw new ApplicationError("You can't update with empty 'Course' relation.")
        if(branchRelation.disconnect.length > 0 && branchRelation.connect.length < 1) throw new ApplicationError("You can't update with empty 'Branch' relation.")
    },
    async beforeDelete(event){
        const classId = event.params.where.id

        const classEntity = await strapi.entityService.findOne('api::class.class', classId, {
            populate: {
                users_permissions_users: true
            }
        })
        
        if(classEntity.users_permissions_users.length > 0) throw new ApplicationError("You can't delete this class, if it has some Student relation.")
    },
    async beforeDeleteMany(event){
        const classesId = event.params.where.$and[0].id.$in
        
        const classEntities = await strapi.entityService.findMany('api::class.class', {
            filters: {
                id: classesId
            },
            populate: {
                users_permissions_users: true
            }
        })
        classEntities.map(en => {
            if(en.users_permissions_users.length > 0) throw new ApplicationError("You can't delete this class, if it has some Student relation.")
        })
    },
};