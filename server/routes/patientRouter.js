const express = require('express')
const Router = express.Router()
const patientController = require('../controller/patientController')

Router.post('/getBookAppointment', patientController.getBookAppointment)

module.exports = Router