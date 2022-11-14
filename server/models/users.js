'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Users.belongsTo(models.AllCodes, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
            Users.belongsTo(models.AllCodes, { foreignKey: 'roleId', targetKey: 'keyMap', as: 'roleData' })
            Users.belongsTo(models.AllCodes, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
            Users.hasOne(models.Markdowns, { foreignKey: 'doctorId' })

            Users.hasMany(models.Bookings, { foreignKey: 'patientId', as: 'patientData' })
        }
    }
    Users.init(
        {
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
            },
            firstName: {
                type: DataTypes.STRING,
            },
            lastName: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
            gender: {
                type: DataTypes.STRING,
            },
            roleId: {
                type: DataTypes.STRING,
            },
            phoneNumber: {
                type: DataTypes.STRING,
            },
            positionId: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Users',
            timestamps: true
        }
    );
    return Users;
};
