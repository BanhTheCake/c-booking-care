'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('DoctorInfos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            doctorId: {
                type: Sequelize.INTEGER,
            },
            priceId: {
                type: Sequelize.STRING,
            },
            provinceId: {
                type: Sequelize.STRING,
            },
            paymentId: {
                type: Sequelize.STRING,
            },
            addressClinic: {
                type: Sequelize.STRING,
            },
            nameClinic: {
                type: Sequelize.STRING,
            },
            note: {
                type: Sequelize.TEXT,
            },
            count: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('DoctorInfos');
    },
};
