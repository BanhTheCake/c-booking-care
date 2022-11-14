'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AllCodes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            AllCodes.hasMany(models.Users, { foreignKey: 'positionId', as: 'positionData' })
            AllCodes.hasMany(models.Users, { foreignKey: 'roleId', as: 'roleData' })
            AllCodes.hasMany(models.Users, { foreignKey: 'gender', as: 'genderData' })
            AllCodes.hasMany(models.Schedules, { foreignKey: 'timeType', as: 'timeTypeData' })

            AllCodes.hasMany(models.DoctorInfos, { foreignKey: 'priceId', as: 'priceData' })
            AllCodes.hasMany(models.DoctorInfos, { foreignKey: 'paymentId', as: 'paymentData' })
            AllCodes.hasMany(models.DoctorInfos, { foreignKey: 'provinceId', as: 'provinceData' })

            AllCodes.hasMany(models.Bookings, { foreignKey: 'timeType', as: 'timeTypePatientData' })
        }
    }
    AllCodes.init(
        {
            keyMap: {
                type: DataTypes.STRING,
            },
            type: {
                type: DataTypes.STRING,
            },
            valueEN: {
                type: DataTypes.STRING,
            },
            valueVI: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'AllCodes',
            timestamps: true,
        }
    );
    return AllCodes;
};
