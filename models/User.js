import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
const {Schema, model} = mongoose
import uniqueValidator from 'mongoose-unique-validator'

let SALT_WORK_FACTOR = 12

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    firstname: {
        type: String,
        // required: true,
        index: true
    },
    lastname: {
        type: String,
        // required: true,
        index: true
    },
    dni: {
        type: String,
        match: /[0-9]{8}/,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    childs: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }]
},{
    versionKey: false    
})

UserSchema.plugin(uniqueValidator, {message: 'Ya existe un {PATH} con el valor indicado'})

UserSchema.statics.encryptPassword = async (password) => {
    // Para acelerar los test, verificamos NODE_ENV
    // demodo que si estamos realizando test, establecemos SALT_WORK_FACTOR = 1
    // para disminuir el costo de la encripcion del password    
    if (process.env.NODE_ENV === 'test') {
        SALT_WORK_FACTOR = 1;
    }
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    return await bcrypt.hash(password, salt)
}

UserSchema.statics.comparePasswordAndHash = async (password, newPassword) => {
    // Compara las contraseñas proporcionadas
    return await bcrypt.compare(password, newPassword)
}

export default model('User', UserSchema)