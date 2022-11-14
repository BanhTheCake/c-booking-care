'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clinics extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Clinics.init(
        {
            address: {
                type: DataTypes.STRING,
            },
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
            modelName: 'Clinics',
            timestamps: true,
        }
    );
    return Clinics;
};
