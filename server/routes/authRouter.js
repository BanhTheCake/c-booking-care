const express = require('express')
const Router = express.Router()
const authController = require('../controller/authController')

Router.post('/register', authController.register)
Router.post('/login', authController.login)
Router.get('/refreshAccessToken', authController.refreshAccessToken)
Router.get('/logout', authController.logout)

module.exports = Router