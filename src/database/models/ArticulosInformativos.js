'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class ArticulosInformativos extends Model {}
    
    ArticulosInformativos.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true
        },
        epigrafe: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        localidad: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        textoInformativo: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ArticulosInformativos',
        tableName: 'articulos_informativos',
        timestamps: false 
    });

    return ArticulosInformativos;
};