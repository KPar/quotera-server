const yup = require('yup');

const userRegisterSchema = yup.object({
    username: yup.string().trim().matches(/^\S*$/, 'Whitespace is not allowed').max(30).required(),
    password: yup.string().trim().matches(/^\S*$/, 'Whitespace is not allowed').min(7).required(),
    email: yup.string().email().required()
});

const userUpdateUsernameSchema = yup.object({
    username: yup.string().trim().matches(/^\S*$/, 'Whitespace is not allowed').max(30).required(),
})

const userUpdatePasswordSchema = yup.object({
    password: yup.string().trim().matches(/^\S*$/, 'Whitespace is not allowed').min(7).required(),
})

const userUpdateEmailSchema = yup.object({
    email: yup.string().email().required()
})

module.exports = {
    userRegisterSchema,
    userUpdateUsernameSchema,
    userUpdatePasswordSchema,
    userUpdateEmailSchema
}