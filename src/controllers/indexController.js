const path = require('path');



const indexController = {
  
    index: (req, res, next) => {
      const articulos = [
        { img: 'ruta/a/la/imagen1.jpg', descripcion: 'Descripción del artículo 1' },
        { img: 'ruta/a/la/imagen2.jpg', descripcion: 'Descripción del artículo 2' },
        { img: 'ruta/a/la/imagen3.jpg', descripcion: 'Descripción del artículo 3' }
      ]
        res.render('index', { title: 'Bienvenidos', articulos });
    }
};

module.exports = indexController;