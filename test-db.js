// scripts/test-db.js
require('dotenv').config(); // Si usas variables de entorno
const db = require('./src/database/models'); // Ajusta la ruta según tu estructura

async function testSync() {
  try {
    await db.sequelize.authenticate();
    console.log('✓ Conexión OK');
    
    const tableInfo = await db.sequelize.query("SHOW COLUMNS FROM secretarias");
    console.log('✓ Columnas en tabla:', tableInfo[0].map(c => c.Field));
    
    const count = await db.Secretarias.count();
    console.log(`✓ Registros encontrados: ${count}`);
  } catch (error) {
    console.error('✗ Error:', error);
  } finally {
    await db.sequelize.close(); // Cierra la conexión
  }
}

testSync();