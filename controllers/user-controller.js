const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json(err)
    }
}

const createUser = async (req, res) => {
    try {
        const {username, firstname, lastname, dni, password, roles} = req.body
        const newUser = new User({
            username,
            firstname,
            lastname,
            dni,
            password: await User.encryptPassword(password),
            roles
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    getAllUsers,
    createUser
}