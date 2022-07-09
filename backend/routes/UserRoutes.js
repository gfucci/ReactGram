const express = require("express")
const router = express.Router()

//controller
const { register } = require("../controller/UserController")
const { login } = require("../controller/UserController")

//middlewares
const  validate = require("../middlewares/handleValidations")
const { userCreateValidation } = require("../middlewares/userValidations")
const { userLoginValidation } = require("../middlewares/userValidations")

//routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", userLoginValidation(), validate, login)

module.exports = router