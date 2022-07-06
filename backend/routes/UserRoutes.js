const express = require("express")
const router = express.Router()

//controller
const { register } = require("../controller/UserController")

//middlewares
const { validate } = require("../middlewares/handleValidations")

//routes
router.post("/register", register)

module.exports = router