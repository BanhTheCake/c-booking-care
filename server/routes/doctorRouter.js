const express = require('express');
const Router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const doctorController = require('../controller/doctorController');

Router.get('/getTopDoctor', doctorController.getTopDoctor);
Router.get(
    '/getAllDoctor',
    authMiddleware.verifyToken,
    doctorController.getAllDoctor
);
Router.post(
    '/updateInfoDoctor/:id',
    authMiddleware.verifyToken,
    doctorController.updateInfoDoctor
);
Router.get(
    '/getDetailsDoctor/:id',
    doctorController.getDetailsDoctor
);


Router.get('/getMarkdownDoctor/:id', doctorController.getMarkdownDoctor);
Router.get('/getDoctorInfo/:id', doctorController.getDoctorInfo)
Router.post('/bulkCreateSchedule', authMiddleware.verifyToken, doctorController.bulkCreateSchedule);
Router.get('/getScheduleHour', doctorController.getScheduleHour)
Router.get('/getDaySchedule', doctorController.getDaySchedule)
Router.get('/getPatientOfDoctor', doctorController.getPatientOfDoctor)

module.exports = Router;
