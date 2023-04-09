module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define("history", {
    patientId: {
      type: DataTypes.INTEGER,
    },
    doctorId: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    files: {
      type: DataTypes.TEXT,
    },
  });

  return History;
};
