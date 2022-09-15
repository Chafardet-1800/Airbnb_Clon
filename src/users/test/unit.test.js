const { assert } = require("chai")
const { it, describe } = require("mocha")
const usersControllers = require('../user.controllers')

describe('Test of my Users', () => {
    it('Should return new user when i sent correct data', (done) => {
        
        const obj = {
            "first_name": "Usuario de text",
            "last_name": "Tester",
            "password":"1234",
            "email": "tester@example.com",
            "phone": "012123123342",
            "birthday_date": 06/04/2022,
            "profile_img": "",
            "contry": "Venezuela" 
        }
        
        const data = usersControllers.createUser(obj)

        assert.equal(data.first_name, obj.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, obj.password)
        assert.equal(data.profile_img, "")
        done()
    })

    it('Should return new user when i sent correct data with optional inputs', (done) => {
        
        const obj = {
            "first_name": "Usuario de text",
            "last_name": "Tester",
            "password":"1234",
            "email": "tester@example.com",
            "phone": "012123123342",
            "birthday_date": 06/04/2022,
            "profile_img": "asdsdasda",
            "contry": "Venezuela" 
        }
        
        const data = usersControllers.createUser(obj)

        assert.equal(data.first_name, obj.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, obj.password)
        assert.equal(data.profile_img, "asdsdasda")
        done()
    })

    it('Should return the user with the indicated ID', (done) => {
        const data = usersControllers.getUserById('b16cc778-f48f-428f-a01c-dd602a5dc07a')

        assert.property(data, 'id')
        assert.property(data, 'rol')
        assert.property(data, 'first_name')
        assert.property(data, 'email')
        assert.property(data, 'is_active')
        assert.equal(data.rol, 'admin')
        assert.typeOf(data.password, 'string')
        assert.typeOf(data.is_active, 'boolean')

        done()
    })

    it('Should return error when i sent an invalid ID', (done) => {
        const data = usersControllers.getUserById('428f-a01c-dd602a5dc07a')

       assert.typeOf(data, 'boolean')
       assert.equal(data, 'false')

        done()
    })
})