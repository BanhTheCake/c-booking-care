'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DoctorInfos extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            DoctorInfos.hasOne(models.Markdowns, { foreignKey: 'doctorId', as: 'doctorInfoData' })
            DoctorInfos.belongsTo(models.AllCodes, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData' })
            DoctorInfos.belongsTo(models.AllCodes, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentData' })
            DoctorInfos.belongsTo(models.AllCodes, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceData' })
            DoctorInfos.belongsTo(models.Specialties, { foreignKey: 'specialtiesId', as: 'doctorListData' })

        }
    }
    DoctorInfos.init(
        {
            doctorId: {
                type: DataTypes.INTEGER,
            },
            priceId: {
                type: DataTypes.STRING,
            },
            provinceId: {
                type: DataTypes.STRING,
            },
            paymentId: {
                type: DataTypes.STRING,
            },
            addressClinic: {
                type: DataTypes.STRING,
            },
            nameClinic: {
                type: DataTypes.STRING,
            },
            specialtiesId: {
                type: DataTypes.INTEGER,
            },
            clinicId: {
                type: DataTypes.INTEGER,
            },
            note: {
                type: DataTypes.TEXT,
            },
            count: {
                type: DataTypes.INTEGER,
            },
          
        },
        {
            sequelize,
            modelName: 'DoctorInfos',
            timestamps: true,
            freezeTableName: true
        }
    );
    return DoctorInfos;
};
