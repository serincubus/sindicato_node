'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Consultorios extends Model {}
    
    Consultorios.init({
        idConsultorios: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false,
            autoIncrement: true
        },
        especialidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        nombreEspecialista: {
            type: DataTypes.STRING,
            allowNull: true
        },

        direccion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        
        diaHorario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        observacion: {
            type: DataTypes.STRING,
            allowNull: false
        }

        
    }, {
        sequelize,
        modelName: 'Consultorios',
        tableName: 'consultorios',
        timestamps: false 
    });

    return Consultorios;
};