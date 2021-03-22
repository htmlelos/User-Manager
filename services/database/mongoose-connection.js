const mongoose = require('mongoose')

console.log('DATABASE_URI' + process.env.DATABASE_URI)

mongoose.connect(process.env.DATABASE_URI)
const database = mongoose.connection

database.on('connect', error => {
    console.log(`Conectado a la base dedatos en: ${process.env.DATABASE_URI}`)
})

database.on('error', error => {
    console.log(`Error de conexión, no se pudo conextar a ${process.env.DATABASE_URI}`)
})