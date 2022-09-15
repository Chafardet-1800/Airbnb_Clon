//*Dependencias
const express = require('express')
const path = require('path')

//*Archivos de Rutas
const userRouters = require('./users/users.router').router
const authRouters =require('./auth/auth.router').router
const {db} = require('./tools/database')

//*Configuraciones iniciales
const app = express()

db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch(err => console.log(err))

db.sync()
    .then(() => console.log('Database Synced'))
    .catch(err => console.log(err))

//?Esta configuracion es para Habilitar el req.body
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({mesasge: 'All ok!'})
})
app.get("/api/v1/uploads/:imgName", (req, res) =>{
    const imgName = req.params.imgName
    res.status(200).sendFile( path.resolve('uploads/') + '/' + imgName)
})
app.use('/api/v1/users', userRouters)
app.use('/api/v1/auth', authRouters)

app.listen(8000, () => {
    console.log('Server started at port 8000')
})

exports.default = app
exports.app = app
module.exports = app