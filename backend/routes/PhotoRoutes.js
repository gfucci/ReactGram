const express = require("express");
const router = express.Router();

//Controller
const { insertPhoto } = require("../controller/PhotoController")


//Middlewares
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidations")
const { imageUploads } = require("../middlewares/imageUpload")
const { PhotoInsertValidation } = require("../middlewares/photoValidations")

// Routes
router.post("/", authGuard, imageUploads.single("image"), PhotoInsertValidation(), validate, insertPhoto)

module.exports = router