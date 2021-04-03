import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export default mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
const database = mongoose.connection

database.on('connect', error => {
    console.log(`Conectado a la base dedatos en: ${process.env.DATABASE_URI}`)
})

database.on('error', error => {
    console.log(`Error de conexión, no se pudo conextar a ${process.env.DATABASE_URI}`)
})