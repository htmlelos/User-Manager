const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
const database = mongoose.connection

database.on('connect', error => {
    console.log(`Conectado a la base dedatos en: ${process.env.DATABASE_URI}`)
})

database.on('error', error => {
    console.log(`Error de conexión, no se pudo conextar a ${process.env.DATABASE_URI}`)
})