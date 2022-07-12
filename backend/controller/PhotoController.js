const Photo = require("../models/Photo")
const User = require("../models/User")

const mongoose = require("mongoose")

//insert a photo, with an user related to it
const insertPhoto = async (req, res) => {

    const { title } = req.body
    const image = req.file.filename

    const reqUser = req.user
    const user = await User.findById(reqUser._id)

    //create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    })

    //if photo was created sucesfully
    if (!newPhoto) {
        res.status(422).json({
            errors: ["Houve um problema, tente novamente mais tarde"]
        })
        return
    }

    res.status(201).json(newPhoto)
}

//remove a foto from db
const deletePhoto = async (req, res) => {
    const { id } = req.params;
  
    const reqUser = req.user;
  
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));
  
    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
  
    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res 
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
      return;
    }
  
    await Photo.findByIdAndDelete(photo._id);
  
    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
  };

  //get all photos
  const getAllPhotos = async (req, res) => {

    const photos = await Photo.find({})
        .sort([["createdAt", -1]]) //fotos mais novas primeiro
        .exec()

    return res.status(200).json(photos)
  }

  //get user photos
  const getUserPhotos = async (req,res) => {

    const { id } = req.params

    const photos = await Photo.find({ userId: id })
        .sort([["createdAt", -1]]) //fotos mais novas primeiro
        .exec()

    return res.status(200).json(photos)
  }

  //get photo by id
  const getPhotoById = async (req, res) => {

    const { id } = req.params
    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    //check if photo exist
    if (!photo) {
        res.status(404).json({
            errors: ["Foto não encontrada"]
        })
        return
    }

    res.status(200).json(photo)
  }

  //updta an photo
  const updatePhoto = async (req, res) => {

    const { id } = req.params
    const { title } = req.body
    
    let image

    if (req.file) {
      image = req.file.filename
    }

    const reqUser = req.user

    const photo = await Photo.findById(id)

    //check if photo exist
    if (!photo) {
      res.status(404).json({
        errors: ["Foto não encontrada"]
      })
      return
    }
    
    //check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: ["Ocorreu um erro, por favor tente novamente mais tarde"]
      })
      return
    } 

    if (title) {
      photo.title = title
    }

    if (image) {
      photo.image = image
    }

    await photo.save()

    res.status(200).json({photo, message: "Foto atualizado com sucesso"})
  }

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto
}