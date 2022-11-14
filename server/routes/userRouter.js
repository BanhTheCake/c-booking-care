const express = require('express');
const Router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

Router.get(
    '/getAllCodes',
    userController.getAllCodes
);
Router.get(
    '/getDataUser',
    userController.getDataUser
);
Router.get(
    '/getAllUser',
    authMiddleware.verifyToken,
    userController.getAllUser
);
Router.post(
    '/createNewUser',
    authMiddleware.verifyToken,
    userController.createNewUser
);
Router.delete(
    '/deleteUser/:id',
    authMiddleware.verifyToken,
    userController.deleteSelectUser
);
Router.patch(
    '/updateSelectUser/:id',
    authMiddleware.verifyToken,
    userController.updateSelectUser
);

module.exports = Router;
