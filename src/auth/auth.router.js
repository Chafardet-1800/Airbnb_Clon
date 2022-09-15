const router = require('express').Router()

const { Router } = require('express')
const {register} = require('../users/user.http')

const authServices = require('./auth.http.js')

router.post('/login', authServices.login)
router.post('/register', register)

exports.router = router