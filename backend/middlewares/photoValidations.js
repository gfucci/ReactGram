const { body } = require("express-validator")

const PhotoInsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O título é obrigatório")
            .isString()
            .withMessage("O título é obrigatório")
            .isLength({min: 3})
            .withMessage("O título precisa ter no mínimo 3 caracteres"),
        body("image")
            .custom((value, {req}) => {
                if(!req.file) {
                    throw new Error("A imagem é obrigatória")
                }
                return true
            })
    ]
}

const PhotoUpdateValidation = () => {
    return [
        body("title")
            .optional()
            .isString()
            .withMessage("O título é obrigatório")
            .isLength({ min: 3})
            .withMessage("O título precisa ter no mínimo 3 caracteres")
    ]
}

const PhotoCommentValidation = () => {
    return [
        body("comment")
            .isString()
            .withMessage("O comentário é obrigatório")
    ]
}

module.exports = {
    PhotoInsertValidation,
    PhotoUpdateValidation,
    PhotoCommentValidation
}