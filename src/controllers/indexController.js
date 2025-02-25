const path = require('path');
const { ArticulosInformativos } = require('../database/models'); // Importa el modelo desde `models/index.js`

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const formatearFechaArgentina = (fecha) => {
     const opciones = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        timeZone: 'America/Argentina/Buenos_Aires' 
    }; 
    return new Intl.DateTimeFormat('es-AR', opciones).format(new Date(fecha)); 
};

const indexController = {

    //lista los articulos informativos
    index: async (req, res) => {
        
        try {  
            const noticias = await ArticulosInformativos.findAll({
                order: [['fecha', 'DESC']],
                limit: 4
            });  

            // Formatear las fechas antes de pasar a la vista 
            noticias.forEach(noticia => { 
                noticia.fechaFormateada = formatearFechaArgentina(noticia.fecha); 
            });

            res.render('index', { title: 'Sitio oficial del Sindicato de Trabajadores Municipales de San Miguel Jose C Paz y Malvinas Argentinas', noticias })
        } catch (error) {  
            res.status(500).send(error.message);  
        }  
    },
    
    //renderiza la vista crearNoticia.ejs
    crearNoticia: (req, res) => { 
        res.render('crearNoticia', { title: 'Crear Noticia' }); 
    },
    
    //crea la noticia
    almacenaNoticia: async (req, res) => {
        try {
            const { fecha, titulo, epigrafe, localidad, textoInformativo } = req.body;
            const imagen = req.file ? req.file.filename : null;

            // Validar campos requeridos
            if (!fecha || !titulo || !textoInformativo) {
                return res.status(400).json({ message: 'Fecha, título y texto informativo son campos requeridos' });
                
            }
            // Asegurarse de que `epigrafe` no sea nulo 
            const epigrafeValue = epigrafe !== undefined && epigrafe !== null ? epigrafe : '';
           
            // Verificar datos antes de insertar 
            console.log({ fecha, titulo, imagen, epigrafe: epigrafeValue || '', localidad, textoInformativo });

            // Crear el artículo informativo
            const nuevaNoticia = await ArticulosInformativos.create({
                fecha,
                titulo,
                imagen,
                epigrafe,
                localidad,
                textoInformativo
            });

            // Responder con la noticia creada
            return res.status(201).json(nuevaNoticia);
        } catch (error) {
            console.error('Error al crear la noticia:', error);
            return res.status(500).json({ message: 'Error al crear la noticia' });
        }
    },
    verNoticia: async (req, res) => {
         try { const { id } = req.params; 
         const noticia = await ArticulosInformativos.findByPk(id); 
         if (!noticia) { 
            return res.status(404).json({ message: 'Noticia no encontrada' });
            

        } // Formatear la fecha antes de pasar a la vista 
        noticia.fechaFormateada = formatearFechaArgentina(noticia.fecha);

          res.render('detalleNoticia', { title: noticia.titulo, noticia }); 
        } 
        catch (error) { console.error('Error al obtener la noticia:', error);
             return res.status(500).json({ message: 'Error al obtener la noticia' }); }
}
}

module.exports = { indexController, upload };
