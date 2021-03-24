const User = require('../models/User')
const Role = require('../models/Role')

const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        const { username, password, roles } = req.body

        const newUser = new User({
            username,
            password: await User.encryptPassword(password),
        })

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRoles.map((role) => role._id)
        } else {
            const role = await Role.findOne({ name: "user" })
            newUser.roles = [role._id]
        }
        // Registrar el usuario en la base de datos
        const registeredUser = await newUser.save()

        // Crear token 
        const token = jwt.sign({ id: registeredUser._id }, process.env.SECRET, {
            expiresIn: 28800, // 8 horas
        })

        return res.status(200).json({ token })
    } catch (error) {
        // logger        
        return res.status(500).json(error)
    }
}

const signin = async (req, res) => {
    try {
        const userFound = await User.findOne({ username: req.body.username })
            .populate({path: 'roles'})

        if (!userFound) return res.status(400).json({ message: 'Usuario no registrado' })

        const passwordValid = await User.comparePasswordAndHash(req.body.password, userFound.password)

        if (!passwordValid) {
            return res.status(401).json({
                token: null,
                message: 'Las credenciales ingresadas no son correctas por favor intentelo de nuevo',
            })
        }

        const token = jwt.sign({ id: userFound._id }, process.env.SECRET, { expiresIn: 28800, })

        res.json({ token })
    } catch (error) {
        //logger        
        res.json({error, message: '?'})
    }
}

module.exports = {
    signup,
    signin
}