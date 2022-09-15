const {Sequelize} = require('sequelize')

const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '1812',
    database: 'skeleton',
    port: 5432
})

module.exports = {
    db
}

