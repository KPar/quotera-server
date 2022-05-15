const yup = require('yup');

const reflectionCreateSchema = yup.object({
    bookID: yup.number().required(),
    quote: yup.string().trim(),
    reflection: yup.string().trim(),
    category: yup.string().trim().required(),
    isPublished: yup.bool().required()
});

module.exports = reflectionCreateSchema;