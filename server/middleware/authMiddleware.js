const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(403).json({
                errCode: -1,
                message: 'You are not authenticate !'
            })
        }
        const { data } = jwt.verify(token, process.env.NODE_ENV_ACCESS_TOKEN)
        req.id = data.id
        req.email = data.email
        req.roleId = data.roleId
        req.positionId = data.positionId
        next()
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
            message: error.message || 'something wrong with server !',
        })
    }
}

module.exports = { verifyToken }