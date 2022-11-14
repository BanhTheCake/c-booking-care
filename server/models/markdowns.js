'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdowns extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Markdowns.belongsTo(models.Users, { foreignKey: 'doctorId' });
            Markdowns.belongsTo(models.DoctorInfos, {
                foreignKey: 'doctorId',
                as: 'doctorInfoData',
                targetKey: 'doctorId',
            });
        }
    }
    Markdowns.init(
        {
            contentMarkdown: {
                allowNull: false,
                type: DataTypes.TEXT('long'),
            },
            description: {
                allowNull: true,
                type: DataTypes.TEXT('long'),
            },
            doctorId: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            specialtyId: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            clinicId: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: 'Markdowns',
            timestamps: true,
        }
    );
    return Markdowns;
};
