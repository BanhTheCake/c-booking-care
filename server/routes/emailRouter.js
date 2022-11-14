const emailController = require('../controller/emailController')
const express = require('express')
const Router = express.Router()

Router.post('/verifyBooking', emailController.verifyBooking)
Router.post('/confirmBooking', emailController.confirmBooking)

module.exports = Router