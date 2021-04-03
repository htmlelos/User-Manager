import bcrypt from 'bcrypt'
import Role from '../models/Role.js'
import User from '../models/User.js'

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return
    
        const roles = await Promise.all([
            new Role({name: 'admin'}).save(),
            new Role({name: 'padre'}).save(),
            new Role({name: 'hijo'}).save()
        ])
        // logger
        console.log(roles)
    } catch (error) {
        // logger
        console.error(error)
    }    
}

export const createAdmin = async () => {
    // Varificar si existe un usuario administrador
    const user = await User.findOne({username: 'admin'})
    // Obtener roles
    const roles = await Role.find({name: {$in:['admin']}})

    if (!user) {
        // Create un nuevo administrador
        const admin = await User.create({
            username: 'admin',
            password: await bcrypt.hash('admin', 12),
            roles: roles.map(role => role._id),
        })
        admin.save()

        console.log('Usuario administrador creado')
    }
}