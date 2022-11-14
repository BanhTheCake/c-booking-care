const express = require('express');
const Router = express.Router();
const specialtiesController = require('../controller/specialtiesController');
const authMiddleware = require('../middleware/authMiddleware');

Router.post('/createNewSpecialty',authMiddleware.verifyToken ,specialtiesController.createNewSpecialty)
Router.get('/getAllSpecialties', specialtiesController.getAllSpecialties)
Router.get('/getSpecialtyById/:id', specialtiesController.getSpecialtyById)
Router.get('/getDoctorInSpecialty/:id', specialtiesController.getDoctorInSpecialty)

module.exports = Router;
