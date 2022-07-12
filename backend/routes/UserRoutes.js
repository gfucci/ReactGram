const express = require("express")
const router = express.Router()

//controller
const { register, getCurrentUser, update, getUserById } = require("../controller/UserController")
const { login } = require("../controller/UserController")

//middlewares
const  validate = require("../middlewares/handleValidations")
const { userCreateValidation, userUpdateValidation } = require("../middlewares/userValidations")
const { userLoginValidation } = require("../middlewares/userValidations")
const authGuard = require("../middlewares/authGuard")
const { imageUploads } = require("../middlewares/imageUpload")

//routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", userLoginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)
router.put("/", userUpdateValidation(), authGuard, validate, imageUploads.single("profileImage"), update)
router.get("/:id", getUserById)

module.exports = router