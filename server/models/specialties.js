'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialties extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Specialties.hasMany(models.DoctorInfos, { foreignKey: 'specialtiesId', as: 'doctorListData' })
        }
    }
    Specialties.init(
        {
            description: {
                type: DataTypes.TEXT,
            },
            image: {
                type: DataTypes.BLOB('long'),
            },
            name: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Specialties',
            timestamps: true,
        }
    );
    return Specialties;
};
