require('dotenv').config()
const express = require('express')
const server = express()
const mongoose = require('./services/database/mongoose-connection')
const morgan = require('morgan')

// Configuración

const port = process.env.PORT || 3000

if (process.env.NODE_ENV == 'test') {
    server.use(morgan('short'))
}

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

// Rutas

server.get('/api/v1/ping', async (req, res) => {
    await res.json({ message: 'pong' }).status(200)
})

server.use('/api/v1/', require('./routes/user-routes'))

// Servidor

server.listen(port, () => {
    console.log(`El servidor esta ejecutandose en el puerto ${port}`)
})

module.exports = server