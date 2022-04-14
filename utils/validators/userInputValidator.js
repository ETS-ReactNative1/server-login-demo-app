const Joi = require('joi');


const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().required(),
    username:Joi.string().required(),
    phone:Joi.string(),
    emailNotification: Joi.boolean()
})

module.exports={
    signUpSchema
}