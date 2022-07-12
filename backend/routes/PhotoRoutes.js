const express = require("express");
const router = express.Router();

//Controller
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto } = require("../controller/PhotoController")


//Middlewares
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidations")
const { imageUploads } = require("../middlewares/imageUpload")
const { PhotoInsertValidation, PhotoUpdateValidation } = require("../middlewares/photoValidations")

// Routes
router.post("/", authGuard, imageUploads.single("image"), PhotoInsertValidation(), validate, insertPhoto)
router.delete("/:id", authGuard, deletePhoto)
router.get("/", authGuard, getAllPhotos)
router.get("/user/:id", authGuard, getUserPhotos)
router.get("/:id", authGuard, getPhotoById)
router.put("/:id", authGuard, PhotoUpdateValidation(), validate, updatePhoto)

module.exports = router