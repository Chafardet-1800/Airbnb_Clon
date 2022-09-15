const chai = require("chai")
const { it, describe } = require("mocha")
const usersControllers = require('../user.controllers')

const app = require('../../app')
const chaiHttp = require("chai-http")

chai.use(chaiHttp)

describe('Route test of users', () => {
    it('Should return 204 when i delete my own user whit my credentials', (done) => {
        chai.request(app)
            .delete('/api/v1/users/me')
            .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxNmNjNzc4LWY0OGYtNDI4Zi1hMDFjLWRkNjAyYTVkYzA3YSIsImVtYWlsIjoiYW5pYmFsQGV4YW1wbGUuY29tIiwicm9sIjoiYWRtaW4iLCJpYXQiOjE2NjE5MTY0ODh9.jJt-rGSfCh8Yfc990EfJpaX7lXi-kavhbHL8Uxf4uyg')
            .end((err, res) => {
                chai.assert.equal(res.status, 204)
                done()
            })
    })

    it('Should return 200 when i send a correct ID in params', (done) => {
        chai.request(app)
            .get('/api/v1/users/18ddcae2-be9e-45af-991f-72ece4dd75c2')
            .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4ZGRjYWUyLWJlOWUtNDVhZi05OTFmLTcyZWNlNGRkNzVjMiIsImVtYWlsIjoiU3ViYXJhY2hpcGFucXVlcXVlQGdtYWlsLmNvbSIsInJvbCI6Im5vcm1hbCIsImlhdCI6MTY2MTk5NDU5MH0.4jt8iZh5Hfhl5-AC8VAmXsuD5Vk9TO-O538RdSa3HYA')
            .end((err, res) => {
                chai.assert.equal(res.status, 200)
                chai.assert.property(res.body, 'id')
                chai.assert.property(res.body, 'rol')
                chai.assert.property(res.body, 'first_name')
                chai.assert.property(res.body, 'email')
                chai.assert.property(res.body, 'is_active')
                chai.assert.equal(res.body.rol, 'normal')
                chai.assert.typeOf(res.body.password, 'string')
                chai.assert.typeOf(res.body.is_active, 'boolean')
                done()
            })
    })
})