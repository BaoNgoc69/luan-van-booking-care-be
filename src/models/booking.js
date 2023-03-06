'use strict';
const {
    Model
} = require('sequelize');
const users = require('./users');
module.exports = (sequelize, DataTypes) => {
    class booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            booking.belongsTo(models.users, { foreignKey: 'patientId', targetKey: 'id', as: 'patientData' })


        }
    }
    booking.init({
        statusId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        patientId: DataTypes.INTEGER,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        token: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'booking',
    });
    return booking;
};