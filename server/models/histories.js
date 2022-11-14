'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Histories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Histories.init(
        {
            patientId: {
                type: DataTypes.INTEGER,
            },
            doctorId: {
                type: DataTypes.INTEGER,
            },
            description: {
                type: DataTypes.TEXT,
            },
            files: {
                type: DataTypes.TEXT,
            },
        },
        {
            sequelize,
            modelName: 'Histories',
            timestamps: true,
        }
    );
    return Histories;
};
