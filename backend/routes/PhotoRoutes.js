const express = require("express");
const router = express.Router();

//Controller
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById } = require("../controller/PhotoController")


//Middlewares
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidations")
const { imageUploads } = require("../middlewares/imageUpload")
const { PhotoInsertValidation } = require("../middlewares/photoValidations")

// Routes
router.post("/", authGuard, imageUploads.single("image"), PhotoInsertValidation(), validate, insertPhoto)
router.delete("/:id", authGuard, deletePhoto)
router.get("/", authGuard, getAllPhotos)
router.get("/user/:id", authGuard, getUserPhotos)
router.get("/:id", authGuard, getPhotoById)

module.exports = router