'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('specialty', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            //     description: DataTypes.TEXT,
            // image: DataTypes.STRING,
            name: {
                type: Sequelize.TEXT
            },

            image: {
                type: Sequelize.BLOB('long'),
            },
            descriptionHTML: {
                type: Sequelize.TEXT
            },
            descriptionMardown: {
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('specialty');
    }
};