const { handleRegister, handleLogin, handleRefreshAccessToken } = require('../services/authServices');

const register = async (req, res, next) => {
    const { email, password, firstName, lastName, address, gender, roleId, positionId } = req.body;
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
        const resData = await handleRegister(req.body);
        return res.status(200).json(resData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !',
        });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            errCode: -1,
            message: 'email or password is missing !',
        });
    }
    try {
        let resData = await handleLogin(req.body);
        if (resData.errCode !== 0) {
            return res.status(200).json(resData);
        }
        let { refreshToken, ...newResData } = resData;

        res.cookie('refreshToken', refreshToken, {
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

const refreshAccessToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies
        if (!refreshToken) {
            return res.status(401).json({
                errCode: -1,
                message: 'You are not authenticate !'
            })
        }
        const resData = await handleRefreshAccessToken(refreshToken)

        if (resData.errCode !== 0) {
            return res.status(200).json(resData)
        }
        
        let { refreshToken: newRefreshToken, ...newResData } = resData;

        res.cookie('refreshToken', newRefreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
             // SameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            // secure: process.env.NODE_ENV === 'production' ? true : false,
            SameSite: 'None',
            secure: true,
        });

        return res.status(200).json(newResData)

    } catch (error) {
        if (error?.message && error?.message === 'jwt expired') {
            return res.status(401).json({
                errCode: -3,
                message: error.message
            })
        }
        console.log(error);
        return res.status(error?.status || 500).json({
            errCode: -2,
            message: 'something wrong with server !',
        })
    }
}

const logout = (req, res, next) => {
    try {
        res.clearCookie('refreshToken');
        return res.status(200).json({
            errCode: 0,
            message: "OK",
        })
    } catch (error) {
        return res.status(error?.status || 500).json({
            errCode: -2,
            message: error.message || 'something wrong with server !',
        })
    }
}

module.exports = { register, login, refreshAccessToken, logout };
