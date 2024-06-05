import axios from '../../../../../lib/axios'
import { errors } from '@strapi/utils'

const { ApplicationError } = errors

export default {
    async beforeCreate(event){
        const { data } = event.params
        const category_course:any[] = data.category_course.connect
        const assessments:any[] = data.form_assessments.connect
        
        if(category_course.length === 0){
            throw new ApplicationError("Please, add at least one Course relation.")
        }
        
        if(assessments.length > 0){
            throw new ApplicationError("Please, add form_assessments relation in Form_Assessment.")
        }
    },
    async afterCreate(event){
        const { data } = event.params;
        const level = await strapi.db.query('api::level.level').findOne({
            where: { Name_level: data.Name_level },
            populate: { category_course: true }
        })
        if(level === null) return
        
        // Request method:post to server
        const result = await axios.post(`/api/strapi/level`, {
            id: level.id,
            ...data
        })
        console.log(result.data)
    },
    async beforeDelete(event){
        const levelId = event.params.where.id
        
        // Check relation with assessments
        const assessmentEntity = await strapi.db.query('api::form-assessment.form-assessment').findMany({
            where: {
                level: {
                    id: levelId
                }
            }
        })
        if(assessmentEntity.length > 0) throw new ApplicationError("Please, change or remove Level in Assessment which related to level you want to delete.")
    },
    async beforeDeleteMany(event){
        const levelsId = event.params.where.$and[0].id.$in

        // Check relation with assessments
        const assessmentEntities = await strapi.db.query('api::form-assessment.form-assessment').findMany({
            where: {
                level: {
                    id: levelsId
                }
            }
        })
        if(assessmentEntities.length > 0) throw new ApplicationError("Please, change or remove Level in Assessment which related to level you want to delete.")
    },
    async afterDelete(event){
        const entityId = event.params.where.id

        // Request method:delete to server
        const result = await axios.delete(`/api/strapi/level?id=${entityId}`)
        console.log(result.data)
    },
    async afterDeleteMany(event){
        const entitiesId = event.params.where.$and[0].id.$in
        
        // Request method:delete to server
        const result = await axios.delete(`/api/strapi/level?id=${entitiesId.toString()}`)
        console.log(result.data)
    },
    async beforeUpdate(event){
        const { data } = event.params;
    
        // Category-Course relation check
        const courseConnect = data.category_course;

        // CONDITION 1 : Change Course relation, level must has at least one course relation.
        if(courseConnect.disconnect.length > 0 && courseConnect.connect.length < 1){
            throw new ApplicationError('Something went wrong.\nCourse must has at least one relation.')
        }
    },
    async afterUpdate(event){
        const { data } = event.params;    
        if(data === null) return

        // Request method:put to server
        const result = await axios.put(`/api/strapi/level`,{
            ...data
        })
        console.log(result.data)
    }
};