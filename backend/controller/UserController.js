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

module.exports = {
    register
}