import mongoose from 'mongoose'
const {Schema, model} = mongoose

export const ROLES = ['admin', 'padre', 'hijo']


const RoleSchema = new Schema({
    name: String,
},
{
    versionKey: false
})

export default model('Role', RoleSchema)