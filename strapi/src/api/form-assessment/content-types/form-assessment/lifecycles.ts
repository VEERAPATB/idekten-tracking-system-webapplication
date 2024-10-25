import { populate } from 'dotenv';
import axios from '../../../../../lib/axios'
import { errors } from '@strapi/utils'

const { ApplicationError } = errors

type AssessmentQuestion = {
    id: number;
    Topic_Assessment: string;
    Ratio: number;
    Description: QuestionDescription[]
    Descript_Choice: string;
    category_skillsets: [ {id:number} ]
}

type QuestionDescription = {
    type: string;
    children: [ {text: string; type: string} ];
}

export default {
    async afterCreate(event){
        const { data } = event.params;
        
        const assessment = await strapi.db.query('api::form-assessment.form-assessment').findOne({
            where: { Topic_Assessment: data.Topic_Assessment },
            populate: {
                createdBy: true,
                updatedBy: true,
                Form_Radio: {
                    populate: {
                        category_skillsets: true
                    }
                }
            }
        })
        if(assessment === null) throw new ApplicationError("Something went wrong contact IT support!")
        
        // Format description field
        const formQuestion:AssessmentQuestion[] = assessment.Form_Radio
        const newFormQuestion = formQuestion.map(field => {
            return {
                ...field,
                Description: field.Description.map(val => val.children[0].text).toString().replaceAll(',','|'),
                Descript_Choice: field.Descript_Choice.replaceAll(/\n/g,"|")
            }
        })

        console.log({
            id: assessment.id,
            ...data,
            Form_Radio: newFormQuestion,
            createdBy: assessment.createdBy
        })
        
        // request api
        const result = await axios.post('/api/strapi/assessments',{
            id: assessment.id,
            ...data,
            Form_Radio: newFormQuestion,
            createdBy: assessment.createdBy
        })
        console.log(result.data)
    },
    async afterUpdate(event){
        const { data } = event.params

        const assessmentEntity = await strapi.db.query('api::form-assessment.form-assessment').findOne({
            where: {
                id: data.id
            },
            populate:{
                Form_Radio:{
                    populate:{
                        category_skillsets: true
                    }
                }
            }
        })
        // Format description field
        const formQuestion:AssessmentQuestion[] = assessmentEntity.Form_Radio
        const newFormQuestion = formQuestion.map(field => {
            return {
                ...field,
                Description: field.Description.map(val => val.children[0].text).toString().replaceAll(',','|'),
                Descript_Choice: field.Descript_Choice.replaceAll(/\n/g,"|")
            }
        })

        // request api
        const result = await axios.put('/api/strapi/assessments',{
            ...data,
            Form_Radio: newFormQuestion
        })
        console.log(result.data)
    },
    async afterDelete(event){
        const entityId = event.params.where.id
        console.log(entityId)
        
        // Request method:delete to server
        const result = await axios.delete(`/api/strapi/assessments?id=${entityId}`)
        console.log(result.data)
    },
    async afterDeleteMany(event){
        const entitiesId = event.params.where.$and[0].id.$in
        console.log(entitiesId.toString())
        
        // Request method:delete to server
        const result = await axios.delete(`/api/strapi/assessments?id=${entitiesId.toString()}`)
        console.log(result.data)
    },
    
    async beforeCreate(event){
        const { data } = event.params
        const ctx = strapi.requestContext.get()
        
        const fieldsQuestion:any[] = ctx.request.body.Form_Radio
        fieldsQuestion.map(val => {
            if(val.category_skillsets.connect.length < 1){
                throw new ApplicationError("You must add 'category_skillsets' in each fields question, you created.")
            }
        })
        const levelConnect = data.level.connect;
        if(levelConnect.length < 1){
            throw new ApplicationError("You can't create Assessments without Level relation") 
        }
    },
    async beforeUpdate(event){
        const ctx = strapi.requestContext.get();
        const assessmentEntity = ctx.request.body

        // Check level assessments
        const levelDisconnect:number = assessmentEntity.level.disconnect.length
        const levelConnect:number = assessmentEntity.level.connect.length
        if(levelDisconnect && levelConnect !== levelDisconnect) throw new ApplicationError("You've to add more level in this assessment.")
        
        // Check if user add field in updated session
        const addFieldQuestion:any[] = assessmentEntity.Form_Radio.filter(val => val.id === undefined)
        if(addFieldQuestion.length) throw new ApplicationError("You can't add more fields question, if it already used to collect student score.") 

        const prevAssessment = await strapi.entityService.findOne('api::form-assessment.form-assessment', assessmentEntity.id, {
            populate: {
                Form_Radio: {
                    populate: {
                        category_skillsets: true
                    }
                }
            }
        })

        // Check Skill-sets related to ratio
        prevAssessment.Form_Radio.map(field => {
            if(field.category_skillsets.length < 1) throw new ApplicationError(`You can't remove 'category_skillsets' to 0 (${field.Topic_Assessment})`)
            
            var choices:number = field.Descript_Choice.replaceAll(/\n/g,",").split(",").length
            if(choices !== field.Ratio) throw new ApplicationError(`You can't update the 'Ratio' or 'Choice' row (${field.Topic_Assessment})`) 
        })
    },
};