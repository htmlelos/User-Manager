const request = require('supertest')
const server = require('../server')

describe('GET /pong', () => {
    it('deberia devolver pong', async () => {
        const res = await request(server)
            .get('/api/v1/ping')
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual('pong')
    })
})

describe('POST /user', () => {
    it('deberia crear un nuevo usuario', async () => {
        const res = await request(server)
            .post('/api/v1/users')
            .send({
                firstName: 'Sergio',
                lastName: 'Lucero',
                dni: '23202169',
                password: 'monojaderojo'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('success')
    })
})