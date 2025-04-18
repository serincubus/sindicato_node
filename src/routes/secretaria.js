const express = require('express');
const router = express.Router();

const path= require('path');

const secretariaController = require('../controllers/secretariaController.js');



router.get('/:id', secretariaController.detalleSecretaria);


module.exports = router;