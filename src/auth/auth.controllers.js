const { comparePassword } = require('../tools/crypt')
const {getUserByEmail} = require('../users/user.controllers.js')

const loginUser = async (email, password) => {
    const user = await getUserByEmail(email)

    if(user){
        //? user.password Hasheada
        //* passwor texto plano
        const verify_password = comparePassword(password, user.password)

        if(verify_password){
            return user
        }

    }
    
    return false
    
}

module.exports = {
    loginUser
}