const Joi = require('joi');

const RegisterSchema = Joi.object({
    first_name: Joi.string().label('First Name')
        .min(3)
        .max(30)
        .required(),

    last_name: Joi.string().label('Last Name')
        .min(3)
        .max(30)
        .required(),

    password: Joi.string().required().label('Password')
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).strict(),

    confirm_password: Joi.string().label('Confirm Password').valid(Joi.ref('password')).strict(),


    email: Joi.string().label('Email').required()
        .email()
}).options({ abortEarly: false })


module.exports = {
    RegisterSchema
}