const express = require('express');
const urlRoutes = express.Router();

const controller = require('../controllers/file.controller');

urlRoutes.post('/createFile', controller.createOneRequest);
urlRoutes.get('/getFile/:filename', controller.readOneRequest);
urlRoutes.get('/getFiles', controller.readAllRequest);
urlRoutes.put('/updateFile/:filename', controller.updateOneRequest);
urlRoutes.delete('/deleteFile/:filename', controller.deleteOneRequest);

module.exports = urlRoutes;