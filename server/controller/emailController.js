const { handleVerifyBooking, handleConfirmBooking } = require("../services/emailServices");

const verifyBooking = async (req, res) => {
    try {
        const { doctorId, token } = req.query
        if (!doctorId || !token) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameter !'
            })
        }
        const resData = await handleVerifyBooking({ doctorId, token })
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}

const confirmBooking = async (req, res) => {
    try {
        const { doctorId, patientId, timeType, email, image, fullName } = req.body
        console.log({ doctorId, patientId, timeType, email, fullName });
        if (!doctorId || !patientId || !timeType || !email || !image) {
            return res.status(400).json({
                errCode: -1,
                message: 'Missing parameters !'
            })
        }
        const resData = await handleConfirmBooking(req.body)
        return res.status(200).json(resData)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !'
        })
    }
}
module.exports = { verifyBooking, confirmBooking }