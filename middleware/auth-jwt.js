import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Role from '../models/Role.js'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        console.log('token', token)

        if (!token) return res.status(403).json({message:'Las credenciales de autenticación no son válidas'})
    
        const decoded = jwt.verify(token, process.env.SECRET)
        req.userId = decoded.id
        const userFound = await User.findById(decoded.id, {password: 0})
    
        if (!userFound) return res.status(404).json({message: 'Usuario no encontrado'})
        next()
    } catch (err) {
        return res.status(401).json({message: 'No ha proporcionado las credenciales necesarias para realizar la operación'})
    }
}

export const isParent = async (req, res, next) => {
    const userFound = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: userFound.roles}})
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "padre") {
            next()
            return
        }
    }
    
    return res.status(403).json({message: 'No posee los privilegios suficientes para realizar la operación'})
}

export const isAdmin = async (req, res, next) => {
    const userFound = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: userFound.roles}})
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next()
            return
        }
    }
    
    return res.status(403).json({message: 'No posee los privilegios suficientes para realizar la operación'})
}