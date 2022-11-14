'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedules extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Schedules.belongsTo(models.AllCodes, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData' })
        }
    }
    Schedules.init(
        {
            currentNumber: {
                type: DataTypes.INTEGER,
            },
            maxNumber: {
                type: DataTypes.INTEGER,
            },
            date: {
                type: DataTypes.STRING,
            },
            timeType: {
                type: DataTypes.STRING,
            },
            doctorId: {
                type: DataTypes.INTEGER,
            }
        },
        {
            sequelize,
            modelName: 'Schedules',
            timestamps: true,
        }
    );
    return Schedules;
};
