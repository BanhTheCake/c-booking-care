const db = require('../models/index');
const { signAccessToken, signRefreshToken } = require('./authServices');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 8;
const dayjs = require('dayjs')
const Op = require('Sequelize').Op

const handleGetAllCode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.AllCodes.findAll({ where: { type } });
            resolve({
                errCode: 0,
                message: 'OK',
                data,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetDataUser = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = jwt.verify(
                token,
                process.env.NODE_ENV_REFRESH_TOKEN
            );

            const currentUser = await db.Users.findOne({
                where: { email: data.email },
                attributes: { exclude: ['password', 'image']},
                raw: true,
            });

            if (!currentUser) {
                return resolve({
                    errCode: 1,
                    message: 'User not exist !',
                });
            }

            let { id, email, roleId, positionId, ...dataUser } = currentUser;
            const dataToken = { id, email, roleId, positionId };
            dataUser = { email, roleId, id, ...dataUser };

            const accessToken = signAccessToken(dataToken);
            const refreshToken = signRefreshToken(dataToken);

            return resolve({
                errCode: 0,
                message: 'OK',
                dataUser,
                accessToken,
                refreshToken,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.Users.findAll({
                where: { roleId: { [Op.or]: ['R2', 'R1'] }},
                attributes: { exclude: ['password'] },
                raw: true,
                order: [['createdAt', 'DESC']],
            });
            resolve({
                errCode: 0,
                message: 'OK',
                data,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleCreateNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUser = await db.Users.findOne({
                where: { email: data.email },
            });

            if (currentUser) {
                return resolve({
                    errCode: 1,
                    message: 'Email has been register !',
                });
            }

            bcrypt.hash(data.password, saltRounds, async (err, hash) => {
                if (err) {
                    return reject(err);
                }

                data.password = hash;
                const resData = await db.Users.create(data);
                let { password, ...newResData } =
                    JSON.parse(JSON.stringify(resData));

                resolve({
                    errCode: 0,
                    message: 'OK',
                    data: newResData,
                });
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleDeleteSelectUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUser = await db.Users.findOne({ where: { id } });
            if (!currentUser) {
                return resolve({
                    errCode: 1,
                    message: 'User not exist !',
                });
            }
            await db.Users.destroy({ where: { id } });
            resolve({
                errCode: 0,
                message: 'Ok',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleUpdateUser = (data, idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUser = await db.Users.findOne({ where: { id: idUser } });
            if (!currentUser) {
                return resolve({
                    errCode: 1,
                    message: 'User not exist !',
                });
            }
            const { id, updatedAt, ...currentData } = data
            const now = dayjs()
            currentData.updatedAt = now.toISOString() 
            const resData = await db.Users.update({...currentData},{ where: { id } });
            resolve({
                errCode: 0,
                message: 'Ok',
                data: resData
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleGetAllCode,
    handleGetDataUser,
    handleGetAllUser,
    handleCreateNewUser,
    handleDeleteSelectUser,
    handleUpdateUser
};
