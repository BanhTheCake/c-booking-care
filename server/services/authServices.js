const db = require('../models/index');
const bcrypt = require('bcrypt');
const saltRounds = 8;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signAccessToken = (data, exp = '15s') => {
    try {
        const accessToken = jwt.sign(
            {
                data,
            },
            process.env.NODE_ENV_ACCESS_TOKEN,
            { expiresIn: exp }
        );
        return accessToken;
    } catch (error) {
        throw error;
    }
};
const signRefreshToken = (data, exp = '7d') => {
    try {
        const refreshToken = jwt.sign(
            {
                data,
            },
            process.env.NODE_ENV_REFRESH_TOKEN,
            { expiresIn: exp }
        );
        return refreshToken;
    } catch (error) {
        throw error;
    }
};

const handleRegister = (data) => {
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
                let { password, id, roleId, positionId, ...newResData } =
                    JSON.parse(JSON.stringify(resData));

                resolve({
                    errCode: 0,
                    message: 'OK',
                    newResData,
                });
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = data;
            const currentUser = await db.Users.findOne({
                where: { email },
                raw: true,
            });
            if (!currentUser) {
                return resolve({
                    errCode: 1,
                    message: 'email or password is incorrect !',
                });
            }
            bcrypt.compare(
                password,
                currentUser.password,
                function (err, result) {
                    if (err) {
                        return reject(err);
                    }
                    if (!result) {
                        return resolve({
                            errCode: 2,
                            message: 'email or password is incorrect !',
                        });
                    }

                    delete currentUser.password;
                    let { id, email, roleId, positionId, ...dataUser } =
                        currentUser;
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
                }
            );
        } catch (error) {
            reject(error);
        }
    });
};

const handleRefreshAccessToken = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = jwt.verify(
                token,
                process.env.NODE_ENV_REFRESH_TOKEN
            );

            const currentUser = await db.Users.findOne({
                where: { email: data.email },
                raw: true,
            });
            
            if (!currentUser) {
                return resolve({
                    errCode: 1,
                    message: "User not exist !"
                })
            }

            const accessToken = signAccessToken(data);
            const refreshToken = signRefreshToken(data);

            return resolve({
                errCode: 0,
                message: 'OK',
                accessToken,
                refreshToken,
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { handleRegister, handleLogin, signAccessToken, signRefreshToken, handleRefreshAccessToken };
