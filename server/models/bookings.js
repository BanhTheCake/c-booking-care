'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bookings extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Bookings.belongsTo(models.Users, { foreignKey: 'patientId', as: 'patientData' })

            Bookings.belongsTo(models.AllCodes, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypePatientData' })
        }
    }
    Bookings.init(
        {
            statusId: {
                type: DataTypes.STRING,
            },
            doctorId: {
                type: DataTypes.INTEGER,
            },
            patientId: {
                type: DataTypes.INTEGER,
            },
            date: {
                type: DataTypes.STRING,
            },
            token: {
                type: DataTypes.STRING,
            },
            timeType: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Bookings',
            timestamps: true,
        }
    );
    return Bookings;
};
