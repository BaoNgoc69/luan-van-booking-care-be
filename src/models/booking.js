'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    booking.init({
        statusId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        patienId: DataTypes.INTEGER,
        date: DataTypes.DATE,

    }, {
        sequelize,
        modelName: 'booking',
    });
    return booking;
};