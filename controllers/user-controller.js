import User from '../models/User.js'
import Role from '../models/Role.js'

const LIMIT_SIZE = 10



export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
            .populate({
                path: 'childs',
                options: {
                    sort: { firstname: 1 },
                    select: '-password'
                }
            })
            .populate({
                path: 'roles',
                options: {
                    select: 'name'
                }
            })
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json(err)
    }
}

export const createUser = async (req, res) => {
    try {
        const { username, firstname, lastname, dni, password, roles } = req.body
        const newUser = new User({
            username,
            firstname,
            lastname,
            dni,
            password: await User.encryptPassword(password),
            roles
        })
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json(err)
    }
}


export const getUser = async (req, res) => {
    try {
        const userFound = await User.findById(req.params.userId)
            .select('-password')
        res.status(200).json(userFound)
    } catch (err) {
        res.status(400).json(err)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { firstname, lastname, dni } = req.body
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, { firstname, lastname, dni }, { new: true })
        res.status(204).json(updatedUser)
    } catch (err) {
        // logger
        res.status(400).json(err)
    }
}

export const getChildsUser = async (req, res) => {
    try {
        const page = req.query.page
        if (page < 0) {
            res.status(400).json({ message: 'El numero de paginas no puede ser negativo' })
            return
        }
        const userFound = await User.findById(req.params.userId)
            .populate({
                path: 'childs',
                options: {
                    limit: LIMIT_SIZE,
                    skip: LIMIT_SIZE * page,
                    sort: { firstname: 1 },
                    select: '-password'
                }
            }
            )
        if (userFound) {
            res.status(200).json(userFound.childs)
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

export const addChildUser = async (req, res) => {
    try {
        const userFound = await User.findById(req.params.userId)
        if (userFound) {
            const { username, firstname, lastname, dni, password, roles } = req.body
            const roleFound = await Role.find({ name: 'hijo' })
            const child = new User({
                username,
                firstname,
                lastname,
                dni,
                password: await User.encryptPassword(password),
            })
            for (i = 0; i < roleFound.length; i++) {
                child.roles.push(roleFound[i]._id)
            }
            await child.save()

            userFound.childs.push(child._id)
            userFound.save()
            res.status(204).json(child)
        } else {
            res.status(400).json({ message: 'Usuario correspondiente al padre no ha sido encontrado' })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

export const updateChildUser = async (req, res) => {
    try {
        const userFound = await User.findById(req.params.userId)
        if (userFound) {
            if (userFound.childs.includes(req.params.childId)) {
                childUpdated = await User.findByIdAndUpdate(req.params.childId, req.body, { new: true })
            } else {
                res.status(400).json({ message: 'El hijo que se desea actualizar no pertenece al padre indicado' })
            }
            res.status(200).json(childUpdated)
        } else {
            res.status(400).json({ message: 'Padre no encontrado' })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}