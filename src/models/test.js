"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tests.belongsTo(models.users, {
        foreignKey: "doctorId",
        as: "doctor",
      });
    }
  }
  tests.init(
    {
      patientId: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      files: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "tests",
    }
  );
  return tests;
};
