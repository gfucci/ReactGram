const User = require('../models/User')

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET

//Generate Token
const generateToken = (id) => {
    return jwt.sing({ id }, jwtSecret, {
        expiresIn: "7d"
    })
}

//Register and sing in
const register = async (req, res) => {
    res.send("REGISTRO")
}

//Login
const login = async (req, res) => {
    
    const { email, password } = req.body
    const user = await User.findOne({ email })

    //check if user exist
    if(!user) {
        res.status(422).json({errors: ["Usuario não encontrato"]})
        return
    }

    //check if password matches
    if(!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({errors: ["As senhas não correspondem"]})
        return
    }

    //return user with token
    res.status(201).json({
        _id: newUser._id,
        profileImage: user.profileImage,
        token: generateToken(newUser._id)
    })
}

module.exports = {
    register,
    login
}