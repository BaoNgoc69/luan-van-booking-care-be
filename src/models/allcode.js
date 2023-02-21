'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            allcode.hasMany(models.users, { foreignKey: 'positionId', as: 'positionData' })
            allcode.hasMany(models.users, { foreignKey: 'gender', as: 'genderData' })
            allcode.hasMany(models.schedule, { foreignKey: 'timeType', as: 'timeTypeData' })

            allcode.hasMany(models.Doctor_info, { foreignKey: 'priceId', as: 'priceTypeData' })
            allcode.hasMany(models.Doctor_info, { foreignKey: 'provinceId', as: 'provinceTypeData' })
            allcode.hasMany(models.Doctor_info, { foreignKey: 'paymentId', as: 'paymentTypeData' })

        }
    }
    allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'allcode',
    });
    return allcode;
};