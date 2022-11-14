const express = require('express');
const Router = express.Router();
const clinicController = require('../controller/clinicController');
const authMiddleware = require('../middleware/authMiddleware');

Router.post('/createNewClinic', clinicController.createNewClinic)
Router.get('/getAllClinic', clinicController.getAllClinic)
Router.get('/getClinicById/:id', clinicController.getClinicById)
Router.get('/getDoctorInClinic/:id', clinicController.getDoctorInClinic)

module.exports = Router;
