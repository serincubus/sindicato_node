'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Servicios extends Model {}
    
    Servicios.init({
        idServicio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false,
            autoIncrement: true
        },
        nombreServicio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        imagenServicio: {
            type: DataTypes.STRING,
            allowNull: true
        },

        direccionServicio: {
            type: DataTypes.TEXT,
            allowNull: false
        }
        
    }, {
        sequelize,
        modelName: 'Servicios',
        tableName: 'servicios',
        timestamps: false 
    });

    return Servicios;
};