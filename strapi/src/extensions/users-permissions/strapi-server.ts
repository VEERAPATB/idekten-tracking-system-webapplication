import _ from 'lodash'

export default (plugin) => {

    plugin.controllers.user.update = async (ctx) => {
        console.log(ctx.request.body)
        if(!ctx.request.params.id || !ctx.request.body){
            return ctx.response.status = 401
        }

        var updateData = {}

        const prevData = await strapi.entityService.findOne('plugin::users-permissions.user', ctx.request.params.id, {
            populate: '*'
        })
        if(prevData.manage_role.Priority === 'Student' && ctx.request.body.Register_Student){
            updateData = {
                Register_Student: {
                    ...prevData.Register_Student,
                    ...ctx.request.body.Register_Student
                    }, 
                }
        }else{
            updateData = {
                Register_Employee: {
                    ...prevData.Register_Employee,
                    ...ctx.request.body.Register_Employee
                }
            }
        }
        
        await strapi.entityService.update('plugin::users-permissions.user', ctx.request.params.id, {
            populate: ['Register_Student', 'Register_Employee'],
            data: updateData
        }).then((res) => {
            ctx.response.status = 200
            ctx.response.body = res
        })
    }
    
    // Add the custom route
    plugin.routes['content-api'].routes.push({
    method: 'PUT',
    path: '/users/update/:id',
    handler: 'user.update',
    config: {
        prefix: ''
    }
    });

    return plugin;
}