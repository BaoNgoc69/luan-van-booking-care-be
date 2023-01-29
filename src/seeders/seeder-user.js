'use strict';
// email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     address: DataTypes.STRING,
//     gender: DataTypes.BOOLEAN,
//     roleid: DataTypes.STRING,
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      email: 'baon57674@gmail.com',
      password: '12345',
      firstName: 'Bao',
      lastName: 'Ngoc',
      address: 'DT',
      gender: '0',
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
