const express = require("express")
const router = express.Router()

//controller
const { register, getCurrentUser } = require("../controller/UserController")
const { login } = require("../controller/UserController")

//middlewares
const  validate = require("../middlewares/handleValidations")
const { userCreateValidation } = require("../middlewares/userValidations")
const { userLoginValidation } = require("../middlewares/userValidations")
const authGuard = require("../middlewares/authGuard")

//routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", userLoginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)

module.exports = router