'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Secretarias extends Model {}
    
    Secretarias.init({
        id_secretaria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false
        },
        nombre_secretaria: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion_secretaria: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imagen_secretaria: {
            type: DataTypes.STRING,
            allowNull: true
        }
        
    }, {
        sequelize,
        modelName: 'Secretarias',
        tableName: 'secretarias',
        timestamps: false 
    });

    return Secretarias;
};