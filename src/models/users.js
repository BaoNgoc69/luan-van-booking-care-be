'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.belongsTo(models.allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' }),
        users.belongsTo(models.allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' }),
        users.hasOne(models.Markdown, { foreignKey: 'doctorId' })
      users.hasOne(models.Doctor_info, { foreignKey: 'doctorId' })

      users.hasMany(models.schedule, { foreignKey: 'doctorId', as: 'doctorData' })
      users.hasMany(models.booking, { foreignKey: 'patientId', as: 'patientData' })


    }
  }
  users.init({

    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};