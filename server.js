const express = require('express')
const server = express()
// const mongoose = require('./services/database/mongoose-connection')
const config = require('config-yml')

const port = config.port || 3000

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.get('/ping', (req, res) => {
    res.json({message: 'pong'})
})

server.post('/api/v1/users', async (req, res) => {
    await res.json({status: 'success'}).status(200)
})

server.listen(port, () => {
    console.log(`El servidor esta ejecutandose en el puerto ${port}`)
})

module.exports = server