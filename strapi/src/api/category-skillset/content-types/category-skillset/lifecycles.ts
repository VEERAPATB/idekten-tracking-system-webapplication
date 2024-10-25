import axios from '../../../../../lib/axios'
import { errors } from '@strapi/utils'

const { ApplicationError } = errors;

export default {
    async afterCreate(event){
        const { data } = event.params;
        const skill = await strapi.db.query('api::category-skillset.category-skillset').findOne({
            select: ['id','Name_skill','Description','createdAt'],
            where: { Name_skill: data.Name_skill },
            populate: { 
                category_courses: true,
                levels: true
            }
        })
        if(skill === null) return
        
        // Request method:post to server
        const result = await axios.post(`/api/strapi/skill`, {
            ...skill
        })
        console.log(result.data)
    },
    async beforeDelete(event){
        const entityId:number = event.params.where.id
        console.log(entityId)

        const assessmentEntities = await strapi.db.query('api::form-assessment.form-assessment').findMany({
            where: {
                Form_Radio:{
                    category_skillsets:{
                        id: entityId
                    }
                }
            },
            populate: {
                Form_Radio:{
                    populate:{
                        category_skillsets: true
                    }
                }
            }
        })
        if(assessmentEntities.length >= 1) throw new ApplicationError("You have to change skill in assessment to another before remove this skill set.")
    },
    async beforeDeleteMany(event){
        const entitiesId:number[] = event.params.where.$and[0].id.$in

        const assessmentEntities = await strapi.db.query('api::form-assessment.form-assessment').findMany({
            where: {
                Form_Radio: {
                    category_skillsets: {
                        id: {
                            $in: entitiesId
                        }
                    }
                }
            },
            populate: {
                Form_Radio:{
                    populate:{
                        category_skillsets: true
                    }
                }
            }
        })
        if(assessmentEntities.length >= 1) throw new ApplicationError("You have to change skill in assessment to another before remove this skill set.")
    },
    async afterDelete(event){
        const entityId = event.params.where.id

        // Request method:delete to server
        const result = await axios.delete(`/api/strapi/skill?id=${entityId}`)
        console.log(result.data)
    },
    async afterDeleteMany(event){
        const entitiesId = event.params.where.$and[0].id.$in

        // Request method:delete to server
        const result = await axios.delete(`/api/strapi/skill?id=${entitiesId.toString()}`)
        console.log(result.data)
    },
    async afterUpdate(event){
        const { data } = event.params;    
        if(data === null) return

        // Request method:put to server
        const result = await axios.put(`/api/strapi/skill`,{
            ...data
        })
        console.log(result.data)
    }
};