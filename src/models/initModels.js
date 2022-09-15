const Users = require('./user.model')
const Posts = require('./post.model')

const initModels = () => {
    //? Users -> Posts
    Users.hasMany(Posts)
    Posts.belongsTo(Users)
}

module.exports =  initModels


