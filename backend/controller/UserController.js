const User = require('../models/User')

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET

//Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d"
    })
}

//Register and sing in
const register = async (req, res) => {
    
    const {name, email, password} = req.body

    //check if user exist   
    const user = await User.findOne({ email })          

    if (user) {
        res.status(422).json({errors: ["Este email já foi cadastrado"]})
        return
    }

    //generate password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    //create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    //if user was created succesfully, return token
    if (!newUser) {
        res
            .status(422)
            .json({errors: ["Por favor, tente novamente mais tarde"]})

        return
    }


    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
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
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })
}

module.exports = {
    register,
    login
}