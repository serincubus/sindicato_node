
const {Secretarias}= require('../database/models');
    
    console.log('base de datos secretaria', Secretarias);
    
    const secretariaController = {


        

        detalleSecretaria: async (req, res) => {
            try { 
                const secretarias = await Secretarias.findAll();
                const { id } = req.params; 
                const secretaria = await Secretarias.findByPk(id); 
                if (!secretaria) { 
                    return res.status(404).json({ message: 'Secretaria no encontrada' });
                } 
                res.render('secretaria', { secretarias, secretaria }); 
            } catch (error) { 
                console.error('Error al obtener la secretaria:', error);
                return res.status(500).json({ message: 'Error al obtener la secretaria' }); 
            }
        }
    };

module.exports = secretariaController;