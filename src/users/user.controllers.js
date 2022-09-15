const uuid = require('uuid')
const {comparePassword, hashPassword} = require('../tools/crypt.js')

const Users = require('../models/user.model')

const getAllUsers = async () => {

    const data = await Users.findAll({
        attributes: {
            exclude: ['password']
        }
    })

    return data
    //select * from users
}

const getUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            //id: id
            id
        },
        attributes: {
            exclude: ['password']
        }
    })

    return data
    //select * from users where id = ${id};
}

const createUser = async (data) => {
    console.log(data)
    const newUser = await Users.create({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        birthday_date: data.birthday_date,
        country: data.country,
        id: uuid.v4(),
        password: hashPassword(data.password),
        role:'normal',
        status: true, 
        verified: false 
    })

    console.log(newUser.first_name)
    return newUser
}

const editUser = async (userId, data, userRole) => {
    if(userRole  === 'admin') {
        const {password, id, verified, ...newData} = data

        const response = await Users.update({
                ...newData
            }, {
                where: {
                //id: id
                id: userId
            }})
        return response
    } else {
        const {password, id, verified, role, ...newData} = data

        const response = await Users.update({
                ...newData
            }, {
                where: {
                //id: id
                id: userId
            }})
        return response
    }
}

const deleteUser = async (id) =>{
    const data = await Users.destroy({
        where: {
            //id: id
            id: id
        }
    })
    return data
}

const getUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: {
            //email: email
            email: email
        },
        attributes: {
            exclude: ['password']
        }
    })

    return data
}

const editProfileImage = async (id, imgUrl) => {
        const response = await Users.update({
                profile_img: imgUrl
            }, {
                where: {
                //id: id
                id: id
            }})
        return response
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
    getUserByEmail,
    editProfileImage
}
