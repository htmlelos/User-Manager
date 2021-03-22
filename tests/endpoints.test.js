const request = require('supertest')
const server = require('../server')

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