var express = require('express');
var router = express.Router();
const {indexController, upload}= require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.index) 

// Get creacion nota informativa

router.get('/crearNoticia', indexController.crearNoticia)
router.post('/crearNoticia', upload.single('imagen'),indexController.almacenaNoticia)

//get detalle de la noticia
router.get('/detalleNoticia/:id', indexController.verNoticia)

module.exports = router;
