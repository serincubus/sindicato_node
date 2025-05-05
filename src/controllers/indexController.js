const path = require('path');
const { ArticulosInformativos } = require('../database/models'); // Importa el modelo desde `models/index.js`
const db = require('../database/models')
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

    
    menuPrincipal:async (req, res) => {
            
        console.log('=== INICIO DE DIAGNÓSTICO ===');
try {
  // 1. Consulta con parámetros explícitos
  const secretarias = await db.Secretarias.findAll({
    raw: true,  // Datos planos
    logging: console.log  // Muestra la consulta SQL
  });
  const noticias = await db.ArticulosInformativos.findAll({
    order: [['fecha', 'DESC']],
    limit: 4
})

  // 2. Debug detallado
  console.log('Datos obtenidos:', {
    cantidad: secretarias.length,
    primerRegistro: secretarias[2] || 'No hay datos',
    variablesDisponibles: Object.keys(res.locals)
  });

  noticias.forEach(noticia => { 
    noticia.fechaFormateada = formatearFechaArgentina(noticia.fecha); 
});

  // 3. Render con protección de variables
  return res.render('index', {
    title: "'Sitio oficial del Sindicato de Trabajadores Municipales de San Miguel, Jose C Paz y Malvinas Argentinas'",
    secretarias: secretarias, // Asegúrate que coincida con el nombre en la vista
    _debug: {
      timestamp: Date.now(),
      query: 'SELECT * FROM secretarias'
    }, noticias
  });

} catch (error) {
  console.error('Error completo:', {
    message: error.message,
    stack: error.stack.split('\n')[0], // Solo primera línea del error
    dbConnected: db.sequelize.authenticated
  });
  return res.status(500).render('error', {
    title: "Error",
    message: "Error al cargar datos"
  });
}
},

    
    
    //renderiza la vista crearNoticia.ejs
    crearNoticia:async  (req, res) => 
      { try {  
      const secretarias = await db.Secretarias.findAll({
        raw: true,  // Datos planos
        logging: console.log  // Muestra la consulta SQL
      });
              

      res.render('crearNoticia', { title: 'Crear Noticia', secretarias })
  } catch (error) {  
      res.status(500).send(error.message);  
  }  
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
         const secretarias = await db.Secretarias.findAll({
            raw: true,  // Datos planos
            logging: console.log  // Muestra la consulta SQL
          });
         const noticia = await ArticulosInformativos.findByPk(id); 
         if (!noticia) { 
            return res.status(404).json({ message: 'Noticia no encontrada' });
            

        } // Formatear la fecha antes de pasar a la vista 
        noticia.fechaFormateada = formatearFechaArgentina(noticia.fecha);

          res.render('detalleNoticia', { title: noticia.titulo, secretarias, noticia }); 
        } 
        catch (error) { console.error('Error al obtener la noticia:', error);
             return res.status(500).json({ message: 'Error al obtener la noticia' }); }
},

editarNoticia: async (req,res) => {
  try { 
    const {id} = req.params;
    const noticia = await ArticulosInformativos.findByPk(id);
    const secretarias = await db.Secretarias.findAll({
      raw: true,  // Datos planos
      logging: console.log  // Muestra la consulta SQL
    });
    if (!noticia) {
      return res.status(404).json({message: "noticia no encontrada"});
    }
    noticia.fechaFormateada = formatearFechaArgentina(noticia.fecha);
    res.render('editarNoticia', {title:"Editar noticia", noticia, secretarias});
  } catch (error) {
    console.error('Error al obtener la noticia:', error.message);
    return res.status(500).json({ message: 'Error al obtener la noticia' });
    }
  },

actualizarNoticia: async (req,res) =>{
  try {
    const {id} = req.params;
    console.log("id de la noticia a actualizar:", id);
    
    const {fecha,titulo,epigrafe,localidad,textoInformativo}= req.body;
    const imagen = req.file ? req.file.filename : null;
    const noticia = await ArticulosInformativos.findByPk(id);
    if (!noticia) {
      return res.status(404).json({message: "noticia no encontrada"});
    }
      const epigrafeValue = epigrafe !== undefined && epigrafe !== null ? epigrafe : '';
      const noticiaActualizada = await ArticulosInformativos.update({
        fecha,
        titulo,
        imagen,
        epigrafe: epigrafeValue || '',
        localidad,
        textoInformativo
      }
      , {
        where: {id: noticia.id}
    })

      // responder con la noticia actualizada
    return res.status(200).json(noticiaActualizada);
   
    
  }
  catch (error) {
    console.error(' Error al actualizar la noticia:', error.message);
    return res.status(500).json({message:"Error al actualizar la noticia"})
    }
 

},
eliminarNoticia: async (req,res)=>{
  try {
    const {id}= req.params;
    const noticia = await ArticulosInformativos.findByPk(id);
    console.log("noticia encontrada:", noticia);
    
    if (!noticia) {
      return res.status(404).json({message: "noticia no encontrada"});
    }
    await ArticulosInformativos.destroy({
      where: {id}
    })
  
    return res.status(200).json({message: "noticia eliminada"})
  } catch (error) {
    console.error('Error al eliminar la noticia:', error.message);
    return res.status(500).json({message: "Error al eliminar la noticia"})
  }

},

dashboard : async (req,res) => {
  try {
    const noticias = await ArticulosInformativos.findAll()
    if (!noticias) {
      return res.status(404).json({message: "noticia no encontrada"});
    }
    res.render('dashboard', {title:"dashboard", noticias})
    
  } catch (error) {
    console.error('error al obtener la noticia:', error.message);
    return res.status(500).json({message:"error al obtener la noticia"})
  }
},

search: async (req,res) => {
  try {
    const secretarias = await db.Secretarias.findAll();
    const search= req.query.search ? req.query.search.trim() : '';
    const noticias = await db.ArticulosInformativos.findAll({
      where: {
        titulo: {
          [db.Sequelize.Op.like]: `%${search}%`
        }
         
      }
    })
    if (!noticias || noticias.length === 0) {
      return res.status(404).json({ message: "noticia no encontrada" });
    }
    res.render('search', {title:"Resultados de la busqueda", noticias, secretarias})
    
    
  }catch(error){
    console.error('error al obtener la noticia:', error.message);
    return res.status(500).json({message:"error al obtener la noticia"})
  }
}

}

module.exports = { indexController, upload };
