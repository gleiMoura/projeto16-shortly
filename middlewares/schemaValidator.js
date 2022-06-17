export function validateSchema(schema) {
    return (req, res, next) => {
        const validate = schema.validate(req.user, { abortEarly: false });
        if (validate.error) {
            return res.status(422).send(error.details.map(detail => detail.message));
        }
        next()
    }
    
}