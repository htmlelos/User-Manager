import dotenv from 'dotenv'
import express from 'express'
const server = express()
import morgan from 'morgan'
import {createRoles, createAdmin} from './utils/startup.js'
import mongoose from './services/database/mongoose-connection.js'

import authRoutes from './routes/auth-routes.js'
import userRoutes from './routes/user-routes.js'

// Inicializar
dotenv.config()
createRoles()
createAdmin()
// Configuración
const port = process.env.PORT || 3000

if (process.env.NODE_ENV == 'dev') {
    server.use(morgan('short'))
}

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
// Rutas
server.get('/api/v1/ping', async (req, res) => {
    await res.json({ message: 'pong' }).status(200)
})

server.use('/api/v1/', authRoutes)
server.use('/api/v1/', userRoutes)
// Servidor
server.listen(port, () => {
    console.log(`El servidor esta ejecutandose en el puerto ${port}`)
})

export default server