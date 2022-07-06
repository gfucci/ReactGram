const { validateResult } = require("express-validator")

const validate = (req, res, next) => {
    const errors = validateResult(req)

    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []

    errors.array().map((err) => {
        extractedErrors.push(err.msg)
    })

    return res.status(422).json({
        errors: extractedErrors
    })
}

module.exports = validate