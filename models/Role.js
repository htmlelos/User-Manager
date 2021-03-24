const mongoose = require('mongoose')

const ROLES = ['admin', 'padre', 'hijo']


const RoleSchema = new mongoose.Schema({
    name: String,
},
{
    versionKey: false
})


module.exports = ROLES;
module.exports = mongoose.model('Role', RoleSchema)