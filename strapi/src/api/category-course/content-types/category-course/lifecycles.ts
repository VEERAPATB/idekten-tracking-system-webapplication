import axios from '../../../../../lib/axios'
import { errors } from '@strapi/utils'

const { ApplicationError } = errors; 

export default {
    async afterCreate(event){
        const { data } = event.params;
        const course = await strapi.db.query('api::category-course.category-course').findOne({
            select: ['id'],
            where: { Name_Course: data.Name_Course }
        })
        if(course === null) return
        
        // Request method:post to server
        const result = await axios.post(`/api/strapi/course`, {
            id: course.id,
            ...data
        })
        console.log(result.data)
        
    },
    async afterUpdate(event){
        const { data } = event.params;    
        if(data === null) return

        // Request method:put to server
        const result = await axios.put(`/api/strapi/course`,{
            ...data
        })
        console.log(result.data)
    },
    async afterDelete(event){
        const entityId = event.params.where.id
        
        // Request method:delete to server
        const result = await axios.delete(`/api/strapi/course?id=${entityId}`)
        console.log(result.data)
    },
    async afterDeleteMany(event){
        // CHECK: Check entities, if it still available in strapi database.
        const entitiesId = event.params.where.$and[0].id.$in
        
        // Request method:delete to server
        const result = await axios.delete(`/api/strapi/course?id=${entitiesId.toString()}`)
        console.log(result.data)
    },

    async beforeCreate(event){
        const { data } = event.params;
        const levelsConnectLength:any[] = data.levels.connect

        if(levelsConnectLength.length >= 1){
            throw new ApplicationError("Please, don't add Levels relations in Course.")
        }
    },
    async beforeDelete(event){
        const courseId = event.params.where.id
        
        // Find Course Entity for check, there is another level relation in them or not.
        const courseEntity = await strapi.entityService.findOne('api::category-course.category-course', courseId,{
            populate: { levels: true }
        })
        // CONDITION 1 : If there is at least one level relation, we throw error.
        if(courseEntity.levels.length >= 1) throw new ApplicationError("You couldn't delete this course, because it relate to some levels!")    

        // Check Class -> Course
        const courseClasses = await strapi.db.query('api::class.class').findMany({
            where:{
                category_course:{
                    id: courseId
                }
            }
        })
        if(courseClasses.length > 0) throw new ApplicationError(`You can't delete 'Branch' if it has some 'Class' relation`)
    },
    async beforeDeleteMany(event){
        const entitiesId = event.params.where.$and[0].id.$in

        const courseEntities = await strapi.entityService.findMany('api::category-course.category-course', {
            filters: {
                id: entitiesId
            },
            populate: { levels: true }
        })
        courseEntities.map(val => {
            if(val.levels.length > 0) throw new ApplicationError("You couldn't delete these courses, because they relate to some levels!")
        })

        // Check Class -> Course
        const courseClasses = await strapi.db.query('api::class.class').findMany({
            where:{
                category_course:{
                    id: entitiesId
                }
            }
        })
        if(courseClasses.length > 0) throw new ApplicationError(`You can't delete 'Branch' if it has some 'Class' relation`)
    },
    async beforeUpdate(event){
        const { data } = event.params;

        // CONDITION 1 : If you users would like to change level, we will throw Error.
        if(data.levels.disconnect.length >= 1 || data.levels.connect.length >= 1){
            throw new ApplicationError('Please, change Course level in Level content-type.')
        }
    },
};