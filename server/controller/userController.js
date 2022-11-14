const db = require('../models/index');
const {
    handleGetAllCode,
    handleGetDataUser,
    handleGetAllUser,
    handleCreateNewUser,
    handleDeleteSelectUser,
    handleUpdateUser,
} = require('../services/userServices');

const getAllCodes = async (req, res, next) => {
    const { type } = req.query;
    if (!type) {
        return res.status(400).json({
            errCode: -1,
            message: 'Query Type is require !',
        });
    }
    try {
        const data = await handleGetAllCode(type);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server',
        });
    }
};

const getDataUser = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(200).json({
                errCode: -1,
                message: 'You not authenticate',
            });
        }
        let resData = await handleGetDataUser(refreshToken);
        if (resData.errCode !== 0) {
            return res.status(200).json(resData);
        }

        let { refreshToken: newRefreshToken, ...newResData } = resData;

        res.cookie('refreshToken', newRefreshToken, {
            // maxAge (millisecond)
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
             // SameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            // secure: process.env.NODE_ENV === 'production' ? true : false,
            SameSite: 'None',
            secure: true,
        });

        return res.status(200).json(newResData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !',
        });
    }
};

const getAllUser = async (req, res, next) => {
    try {
        // authorization User
        // const roleId = req?.roleId;
        // if (!roleId || roleId !== 'R1') {
        //     return res.status(401).json({
        //         errCode: -1,
        //         message: 'You are not allow to do this !',
        //     });
        // }
        const resData = await handleGetAllUser();
        return res.status(200).json(resData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !',
        });
    }
};

const createNewUser = async (req, res, next) => {
    const { email, password, firstName, gender, roleId, positionId } = req.body;
    if (
        !email ||
        !password ||
        !firstName ||
        gender == '' ||
        !roleId ||
        !positionId
    ) {
        return res.status(400).json({
            errCode: -1,
            message: 'Missing Parameter !',
        });
    }
    try {
        const resData = await handleCreateNewUser(req.body);
        return res.status(200).json(resData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !',
        });
    }
};

const deleteSelectUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameters id !',
            });
        }
        const resData = await handleDeleteSelectUser(id);
        return res.status(200).json(resData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !',
        });
    }
};

const updateSelectUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body
        if (!id) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameters id !',
            });
        }
        const resData = await handleUpdateUser(data, id);
        return res.status(200).json(resData)         
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !',
        });
    }
};

module.exports = {
    getAllCodes,
    getDataUser,
    getAllUser,
    createNewUser,
    deleteSelectUser,
    updateSelectUser,
};
