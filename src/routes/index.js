var express = require('express');
var router = express.Router();
const {indexController, upload}= require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.menuPrincipal); 
/*router.get('/', indexController.index)*/


// Get creacion nota informativa

router.get('/crearNoticia', indexController.crearNoticia)
router.post('/crearNoticia', upload.single('imagen'),indexController.almacenaNoticia)

//get detalle de la noticia
router.get('/detalleNoticia/:id', indexController.verNoticia)

//get editar noticia
router.get('/editarNoticia/:id', indexController.editarNoticia)

//post actualizar la noticia
router.post('/editarNoticia/:id', upload.single('imagen'), indexController.actualizarNoticia)

//eliminar la noticia
router.delete('/eliminarNoticia/:id', indexController.eliminarNoticia)

//dashboard
router.get('/dashboard', indexController.dashboard);

//buscador
router.get('/search', indexController.search);




module.exports = router;
